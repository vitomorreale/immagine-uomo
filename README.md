# Immagine Uomo — sito web (demo funzionale)

Sito statico multipagina (HTML + Tailwind CSS auto-ospitato + JavaScript vanilla)
per il barbershop **Immagine Uomo**, Via Filippo di Giovanni 72, Palermo.
Nessun framework/build tool è richiesto per usarlo: è già "pronto all'uso".

## Come vederlo

Apri semplicemente `index.html` nel browser, oppure avvia un piccolo server locale
dalla cartella del progetto (consigliato, per far funzionare correttamente i link):

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000/index.html
```

## Struttura del progetto

```
index.html, chi-siamo.html, servizi.html, gallery.html, recensioni.html,
blog.html, blog-1/2/3.html, faq.html, contatti.html, privacy-cookie-policy.html
assets/css/tailwind.css   → Tailwind compilato (auto-ospitato, nessuna CDN esterna)
assets/css/style.css      → stili custom (colori, bottoni, componenti)
assets/js/main.js         → menu mobile, accordion FAQ/listino, carosello recensioni,
                             booking widget multi-step
robots.txt, sitemap.xml   → SEO tecnica di base
_partials/                → sorgenti di header, footer e <head> comuni
_content/                 → sorgenti del contenuto di ogni pagina (head + body)
assemble.py                → script che unisce _partials + _content nelle pagine finali
```

Le pagine `.html` in radice sono già pronte per essere pubblicate così come sono.
Le cartelle `_partials` e `_content` sono i "sorgenti": se modifichi qualcosa lì
dentro, rigenera le pagine con:

```bash
python3 assemble.py
```

Se aggiungi nuove classi Tailwind nel contenuto, ricompila anche il CSS:

```bash
npm install            # una tantum, installa Tailwind in locale
npx tailwindcss -i input.css -o assets/css/tailwind.css --minify
```

## Dati usati per popolare il sito

Nome, indirizzo, telefono, orari e canali social sono stati raccolti da fonti
pubbliche (Google/Fresha, Linktree, Instagram) risultate coerenti con
l'indirizzo indicato — Via Filippo di Giovanni 72, Palermo — e vanno comunque
riconfermati con il titolare prima della pubblicazione:

- **Indirizzo**: Via Filippo di Giovanni 72, 90146 Palermo
- **Telefono / WhatsApp**: 320 098 7400
- **Orari**: martedì–sabato 8:00–20:00, chiuso domenica e lunedì
- **Instagram**: @immagine_uomo_parrucchieri
- **Facebook**: facebook.com/Immagineuomo79
- **Colori**: la palette (nero + rosso-ruggine/arancio bruciato) è ripresa
  dall'insegna reale del negozio in Via Filippo di Giovanni, fotografata da
  Street View

Non è stato possibile leggere il sito attuale (immagineuomopalermo.it) né
recuperare listino prezzi ufficiale, nome completo dello staff o una vera email
di contatto: questi contenuti sono demo/segnaposto (vedi sotto) da sostituire
con le informazioni reali fornite dal titolare.

## Cosa è demo/segnaposto e cosa è già reale

Da sostituire prima della pubblicazione:

- **Fotografie**: tutte le immagini sono blocchi grafici segnaposto (marcati
  chiaramente in ogni pagina) al posto di foto reali del negozio, del team e
  dei lavori — da sostituire con scatti professionali.
- **Prezzi**: il listino in `servizi.html` è un esempio realistico ma
  indicativo (non recuperato dal listino ufficiale, non pubblicato online) —
  da sostituire con i prezzi reali forniti dal titolare.
- **Team**: solo "Salvatore" è basato su un'informazione pubblica (bio
  Instagram); gli altri eventuali collaboratori vanno aggiunti a mano.
- **Prenotazione online**: il widget in `servizi.html#prenota` è una demo
  funzionante che raccoglie servizio/data/ora/nome e genera un messaggio
  WhatsApp precompilato — coerente con il fatto che il salone usa già
  WhatsApp per le prenotazioni (da Linktree). Per un vero calendario con
  disponibilità in tempo reale va collegato un servizio come Fresha,
  Treatwell, Booksy o un plugin di booking del CMS scelto.
- **Recensioni**: i testi in `recensioni.html` e nella home sono di esempio —
  da sostituire con un embed delle recensioni reali di Google Business
  Profile.
- **Form contatti**: il form in `contatti.html` non invia dati (non c'è un
  backend); va collegato a un servizio email/CRM.
- **Privacy/Cookie policy**: `privacy-cookie-policy.html` è un segnaposto da
  sostituire con un'informativa reale conforme GDPR e un vero cookie banner
  con gestione consensi.
- **Articoli del blog**: i 3 articoli presenti sono esempi scritti per
  mostrare formato e stile; possono essere ampliati o sostituiti.

## Verifica effettuata

Testato con Chromium headless (Playwright) su viewport desktop (1440×900,
1280×900) e mobile (390×844): tutte le pagine caricano senza errori
JavaScript, il menu mobile si apre/chiude correttamente, l'accordion del
listino e delle FAQ funziona, il filtro della gallery funziona, il flusso di
prenotazione multi-step genera correttamente il link WhatsApp con i dettagli
precompilati e il numero corretto (+39 320 098 7400).
