# Animatoon – Storie in movimento

**Animatoon** è un'app educativa per creare storie animate: i bambini e i ragazzi disegnano personaggi e sfondi su carta, li fotografano, li trasformano in **attori** che si muovono, li mettono in scena, ci mettono sopra la voce, i suoni e la musica, e salvano il loro **film**.

È un **unico file web** (HTML): funziona nel browser, **senza account, senza server e senza installazione**. Disegni, foto, voci e film restano sul dispositivo.

Ideata e sviluppata da **Giuseppe Schiuma**.

## Le tre versioni

Lo stesso motore, tre livelli di complessità, pensati per età diverse. I file di lavoro (`.animatoon` e `.personaggio`) sono gli stessi in tutte e tre: un lavoro iniziato in una versione si può aprire nelle altre.

| Versione | Per chi | Come riconoscerla | File |
| --- | --- | --- | --- |
| **Animatoon Start** | 1ª–3ª primaria (6–8 anni) | riquadro verde **Start** accanto al logo | [`index_start.html`](index_start.html) |
| **Animatoon** | 4ª–5ª primaria (9–10 anni) | logo senza riquadro | [`index_anim_att.html`](index_anim_att.html) |
| **Animatoon Evo** | scuola secondaria di primo grado (11–14 anni) | riquadro rosso **Evo** accanto al logo | [`index_evo_att.html`](index_evo_att.html) |

### Che cosa cambia

- **Start** è la più semplice. Per creare un attore il bambino disegna una persona di fronte, la fotografa e con il dito **colora** testa, braccia e gambe; le schede sono quattro: *Colora le parti · Dove si piega · Ritocca · Prova*. Le azioni sono quelle già pronte (si aggiungono con «+ Azioni»).
- **Animatoon (4ª–5ª)** ed **Evo** hanno il percorso completo per creare l'attore (scelta di persona di fronte, di lato o animale; ritaglio del disegno; articolazioni; colore; prova) e la scheda **Azioni**, dove si possono **creare movimenti personalizzati**, posa dopo posa.

## Come si usa

1. **Apri l'app** nel browser (consigliati iPad, computer o Chromebook con una versione recente di Chrome, Safari, Edge o Firefox): dal sito [profschiuma.github.io/animatoon](https://profschiuma.github.io/animatoon/) oppure scarica il file `.html` e aprilo con un doppio clic.
2. **Prepara la scena**: scegli o fotografa uno **sfondo**, aggiungi **personaggi** e **oggetti**.
3. **Crea un attore** (*Crea l'attore*): disegna su carta, fotografa (o scegli un file), segui le schede e prova a muoverlo.
4. **Registra** la scena: muovi gli attori e racconta con la voce; aggiungi suoni e **musica**.
5. **Titoli e squadra**: titolo del film, classe o sezione, e i ruoli della squadra (regia e montaggio, storia e sceneggiatura, disegni e animazione, voci e suoni).
6. **Guarda** il film, poi **Salva**: un file di lavoro `.animatoon` per riprendere dopo, **Salva il film** per ottenere il video (`.mp4` o `.mov`).

## Che cosa c'è dentro

- Sfondi, personaggi e oggetti da foto o da file, con ritaglio guidato a puntini o a matita
- **Attori articolati**: persone di fronte e di lato, animali; testa, braccia e gambe si piegano senza spezzare il disegno (deformazione "a maglia", che usa la grafica del dispositivo)
- Azioni già pronte: fermo, cammina, corre, siede, dorme, cade, salta, saluta, evviva e altre
- Oggetti che si possono **attaccare** a un personaggio
- Registrazione della voce, effetti sonori («il rumorista») e musica da file o dalla **Raccolta musiche**
- Salvataggio del lavoro e del film sul proprio dispositivo; schermo intero per la proiezione in classe
- Interfaccia in **italiano, inglese, francese, spagnolo e tedesco**

### Raccolta musiche

La raccolta di brani (temi: allegria, ambienti, avventura, emozioni, mistero) è nel repository [`profschiuma/animatoon-musiche`](https://github.com/profschiuma/animatoon-musiche). L'app la apre solo se tocchi «Raccolta musiche».

## Privacy

- Nessun account, cookie, pubblicità, statistiche o tracciamento.
- Disegni, voci, foto e film **non vengono inviati a nessun server**.
- Fotocamera e microfono si usano solo dopo l'autorizzazione del browser.
- L'unica richiesta in rete è facoltativa: la «Raccolta musiche», che contatta GitHub.
- Pensata per l'uso con la guida di un adulto. Prima di condividere o pubblicare film con volti, voci o nomi di minori, seguire le regole della propria scuola e raccogliere le autorizzazioni necessarie.

L'informativa completa è nell'app (scheda Privacy).

## Per chi sviluppa

- Un singolo file HTML con JavaScript e WebGL, senza dipendenze esterne né caricamenti da altri siti all'avvio.
- Le tre versioni nascono dallo stesso codice sorgente e differiscono per interfaccia e funzioni attive.
- I file di lavoro sono JSON: `.animatoon` (scena) e `.personaggio` (attore).

## Licenza e crediti

Licenza **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it)**: puoi condividere e adattare il materiale citando l'autore, senza usi commerciali e con la stessa licenza.

© Giuseppe Schiuma. La mascotte **Scintilla** e il logo Animatoon fanno parte del progetto.

## Segnalazioni

Per errori, idee o richieste apri una *issue* su questo repository, indicando la versione (Start, Animatoon o Evo), il dispositivo e il browser.
