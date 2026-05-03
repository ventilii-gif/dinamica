# Equilibrio · Fisica per il liceo

Web app didattica che illustra le condizioni di equilibrio di un corpo:

- 🪢 appeso a una o due funi,
- 📏 appoggiato su un piano orizzontale (con forza applicata e attrito),
- ⛰️ appoggiato su un piano inclinato (con e senza attrito),
- 🌀 collegato a una molla (tre configurazioni: verticale, orizzontale con attrito, su piano inclinato).

Per ogni scenario c'è una breve **teoria** e una **simulazione interattiva** in cui muovendo i cursori si vedono in tempo reale i vettori delle forze e i valori numerici (peso, normale, tensione, forza elastica, attrito).

> Stato: prima versione (solo teoria + simulazioni). Quiz ed esercizi con suggerimenti graduali verranno aggiunti successivamente.

## Come vederla dal cellulare

Tre strade, in ordine di praticità.

### 1. GitHub Pages (consigliato — URL pubblico, sempre online)

1. Su GitHub apri `Settings` → `Pages`.
2. In **Source** scegli `Deploy from a branch`.
3. In **Branch** seleziona `claude/educational-web-app-9V7mm` (o `main` dopo il merge), folder `/ (root)`, e premi **Save**.
4. Dopo 1–2 minuti la pagina è raggiungibile a:
   `https://ventilii-gif.github.io/dinamica/`
5. Apri quell'URL dal browser del cellulare. Su iPhone (Safari) o Android (Chrome) puoi usare **Aggiungi a schermata Home** per averla come app.

### 2. Server locale sulla stessa rete Wi-Fi (per provare al volo)

Dal computer, nella cartella del progetto:

```bash
python3 -m http.server 8000
```

Trova l'IP locale del computer:

- **macOS / Linux**: `ipconfig getifaddr en0` (Mac) oppure `hostname -I` (Linux).
- **Windows**: `ipconfig` e cerca `IPv4`.

Sul cellulare (collegato alla **stessa rete Wi-Fi**) apri:

```
http://<IP-del-computer>:8000
```

Esempio: `http://192.168.1.42:8000`.

### 3. Offline (file locale sul telefono)

Scarica `index.html` sul telefono (via cloud, AirDrop, allegato email). Aprilo dal file manager: la app funziona anche senza connessione perché tutto è autocontenuto in un solo file.

## Sviluppo locale

Il progetto è un **singolo file** `index.html` con HTML, CSS e JavaScript inline. Nessuna dipendenza, nessuna build.

Per modificarlo basta aprirlo in un editor di testo. Per provare le modifiche: apri il file nel browser (doppio click) o usa il server locale del punto 2.

## Struttura

```
dinamica/
├── index.html   ← l'app completa
└── README.md    ← questo file
```

## Roadmap (prossimi passi)

- [ ] Quiz veloci a risposta multipla con feedback (per scenario).
- [ ] Esercizi numerici con tre suggerimenti progressivi (concetto → formula → impostazione) e disegno finale delle forze applicate al problema.
- [ ] Tracciamento del progresso dello studente (badge "✓ completato") in `localStorage`.
- [ ] Mini-celebrazione al completamento di un capitolo per motivare allo studio.
