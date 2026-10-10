# Animatoon – Storie in movimento

App web educativa per bambini (infanzia e primaria): si disegna, si ritaglia, si racconta con la voce e si ottiene un vero film con titoli di testa, titoli di coda e applausi.

Tutto funziona **in un solo file HTML, nel browser, senza server e senza account**: i disegni, le voci e i film restano sul dispositivo.

- Autore: Giuseppe Schiuma
- Licenza: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it) (indicata nella barra dei crediti dell'app)
- Lingue dell'interfaccia: italiano, inglese, francese, spagnolo, tedesco
- Stato: 10 ottobre 2026 (versione file «14»)

## File

| File | Contenuto |
| --- | --- |
| `index_fase3_kids.html` | Versione con icone piatte (~300 KB) |
| `index_fase3_kids_3d.html` | Versione con icone 3D (~300 KB): stessa logica, in più i filtri CSS e il logo 3D |

Per usarla basta aprire il file in un browser. Nessuna installazione.

## Come funziona (per i bambini)

1. **Scegli lo sfondo** – scheda verde: con la foto o con un file. Lo sfondo viene adattato al formato 16:9.
2. **Crea i personaggi** – fotografa un disegno e ritaglialo col dito (a puntini o a mano libera, con la lente): diventa un personaggio.
3. **Metti in scena** – tocca un personaggio per portarlo sul palco; trascinalo, ruotalo e ingrandiscilo con i cerchi arancioni. Fuori dal riquadro giallo è «dietro le quinte».
4. **Aggiungi la musica** – da un file o registrata con il microfono.
5. **Registra la scena** – premi Registra, racconta con la voce e muovi i personaggi. Mentre registri si possono toccare i bottoni rosa degli **effetti sonori** (boing, clap, applausi, pop, ding, whoosh, passi, tuono).
6. **Costruisci la storia** – in basso si aggiungono altre scene con il +; si trascinano per cambiare l'ordine. Si può partire da una traccia narrativa in 3 o 5 parti.
7. **Passaggi tra le scene** – la freccia tra due scene permette di scegliere: nessuno, dissolvenza o scorrimento.
8. **Crea il film** – «Salva il film»: titoli di testa, scene, titoli di coda e applauso finale.
9. **Salva il lavoro** – «Salva» crea un file `.animatoon` (JSON) per continuare più tardi; «Apri» lo riprende.

Titoli e squadra (titolo, classe, regia, autori, artisti) si compilano da «Titoli e squadra» e finiscono nei titoli di coda.

## Requisiti e dispositivi

- Browser moderno con microfono e fotocamera concessi all'app.
- Provata su: **Chrome per Mac** e **Chrome su iPad Pro M3** (che su iPad usa il motore WebKit di Apple, come Safari).
- Il film esce come `.mp4` (video H.264 + audio AAC) oppure, se il dispositivo non riesce a produrre AAC valido, come `.mov` con audio non compresso. Se la nuova esportazione non è possibile, l'app ricade da sola sul vecchio metodo (registrazione dello schermo, qualità SD).

## Nota tecnica sull'esportazione del film

Il film non viene più registrato dallo schermo in tempo reale (su iPad si bloccava a metà): ogni fotogramma è disegnato e codificato uno alla volta (WebCodecs, 30 fps, 1280×720 o 960×540) e l'audio (voce, musica, effetti, applauso) è mixato a parte e normalizzato.

Sull'audio ci sono due accorgimenti importanti:

- **Bug di WebKit:** l'encoder AAC di Safari/iPad consegna una configurazione audio non valida (il contenuto di un box `esds` invece di un AudioSpecificConfig di 2 byte). Il file risulta con audio muto. L'app la ricostruisce (AAC‑LC, 2 canali, frequenza reale) e toglie eventuali intestazioni ADTS. Segnalazione: https://bugs.webkit.org/show_bug.cgi?id=302253
- **Verifica dell'audio:** si controlla che il file sia leggibile, si attende la comparsa delle tracce audio (su WebKit arrivano in ritardo) e si prova a decodificarlo. Se l'audio non si conferma, l'app mostra un avviso semplice e un pulsante «Scarica l'audio» (WAV).

I dettagli tecnici dell'esportazione non sono mostrati ai bambini: restano nella console del browser (`film: …`) e nell'attributo `data-diag` dell'elemento `#movie-info`.

## Per chi modifica il codice

- Struttura: stage 1040×527 (PAD_X=140, PAD_Y=50), scena 760×427; stato in `storyState`, `projectLibrary`, `projectCredits`; testi in `I18N` (`[it,en,fr,es,de]`) con `T()` e `translateStatic()`.
- Esportazione: `pickFilmConfig`, `exportFilm`, `filmEncodeAac`, `filmFixAsc`, `filmVerify`, `filmProbeAudio`, `filmMuxAudioOnly`, `filmWav`, `MP4.mux` (muxer scritto a mano), `filmMuxLib` (**mp4-muxer 5.2.2**, MIT, incluso nel file).
- Ordine dei tentativi audio: `aacL` → `aac` → `pcm`.
- Parametri di debug (innocui): `window.__noFilm`, `__filmSkipVerify`, `__filmKinds`, `__filmProbe`.
- Le due versioni (piatta e 3D) hanno **JavaScript identico**: ogni modifica va fatta su entrambe.
- Librerie esterne: solo mp4-muxer, incluso. Nessuna chiamata di rete.

## Crediti

Animatoon © Giuseppe Schiuma, CC BY-NC-SA 4.0. mp4-muxer © 2023 Vanilagy, licenza MIT.
