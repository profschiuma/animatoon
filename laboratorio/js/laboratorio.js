// "Stampa la scheda": stampa solo la scheda operativa della missione
// "Stampa questa scheda": stampa la pagina senza menu né intestazione
// (i pulsanti compaiono anche dopo lo sblocco, quindi si usa la delega degli eventi)
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-stampa],[data-stampa-pagina]');
  if (!b) return;
  if (b.hasAttribute('data-stampa')) {
    document.body.classList.add('stampa-scheda');
    var fine = function () { document.body.classList.remove('stampa-scheda'); window.removeEventListener('afterprint', fine); };
    window.addEventListener('afterprint', fine);
  }
  window.print();
});

// Parti riservate: il contenuto è cifrato (AES-GCM) e si apre con la "parola magica" stampata nel libro.
// La parola non è scritta da nessuna parte del sito: serve solo a ricavare la chiave per decifrare.
(function () {
  var blocchi = document.querySelectorAll('[data-cifrato]');
  if (!blocchi.length) return;
  var SALE = 'scintilla-laboratorio-v1', ITER = 600000, CHIAVE = 'lab-scintilla-chiave';
  var enc = new TextEncoder(), dec = new TextDecoder();
  var cripto = window.crypto && window.crypto.subtle;

  function normalizza(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  function daB64(s) { var b = atob(s), o = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) o[i] = b.charCodeAt(i); return o; }
  function inB64(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function leggi() { try { return localStorage.getItem(CHIAVE); } catch (e) { return null; } }
  function scrivi(v) { try { if (v) localStorage.setItem(CHIAVE, v); else localStorage.removeItem(CHIAVE); } catch (e) {} }

  function chiaveDaParola(parola) {
    return cripto.importKey('raw', enc.encode(normalizza(parola)), 'PBKDF2', false, ['deriveKey']).then(function (km) {
      return cripto.deriveKey({ name: 'PBKDF2', salt: enc.encode(SALE), iterations: ITER, hash: 'SHA-256' },
        km, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
    });
  }
  function chiaveDaRaw(b64) {
    return cripto.importKey('raw', daB64(b64), { name: 'AES-GCM' }, false, ['decrypt']);
  }
  function apri(blocco, chiave) {
    var d = daB64(blocco.getAttribute('data-cifrato'));
    return cripto.decrypt({ name: 'AES-GCM', iv: d.slice(0, 12) }, chiave, d.slice(12)).then(function (buf) {
      return dec.decode(buf);
    });
  }
  function apriTutti(chiave) {
    return Promise.all(Array.prototype.map.call(blocchi, function (b) {
      return apri(b, chiave).then(function (html) { return [b, html]; });
    })).then(function (coppie) {
      coppie.forEach(function (c) {
        // il contenuto prende il posto del riquadro (e del suo contenitore, se c'è):
        // così resta figlio diretto della colonna, cosa che serve alla stampa
        var t = c[0].parentNode.hasAttribute('data-avvolto') ? c[0].parentNode : c[0];
        t.insertAdjacentHTML('beforebegin', c[1]);
        t.remove();
      });
      document.querySelectorAll('[data-richiede-sblocco]').forEach(function (e) { e.hidden = false; });
    });
  }

  if (!cripto) {
    blocchi.forEach(function (b) {
      var f = b.querySelector('form'); if (f) f.hidden = true;
      var p = document.createElement('p');
      p.textContent = 'Per aprire questa parte il sito va visitato con un indirizzo sicuro (https).';
      b.querySelector('div').appendChild(p);
    });
    return;
  }

  var salvata = leggi();
  if (salvata) chiaveDaRaw(salvata).then(apriTutti).catch(function () { scrivi(null); });

  blocchi.forEach(function (blocco) {
    var form = blocco.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var campo = form.elements.parola, err = form.querySelector('.errore'), btn = form.querySelector('button');
      err.hidden = true; btn.disabled = true; btn.textContent = 'Un attimo…';
      chiaveDaParola(campo.value).then(function (k) {
        return apri(blocco, k).then(function () {      // se la parola è sbagliata, qui va in errore
          return cripto.exportKey('raw', k).then(function (raw) { scrivi(inB64(new Uint8Array(raw))); });
        }).then(function () { return apriTutti(k); });
      }).catch(function () {
        err.hidden = false; btn.disabled = false; btn.textContent = 'Apri'; campo.focus(); campo.select();
      });
    });
  });
})();
