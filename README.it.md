<div align="center">
  <img src="public/icon.png" alt="Second Brain Logo" width="120" />
  <h1>Second Brain 🧠</h1>
  <p><strong>Il tuo assistente per colloqui invisibile basato sull'IA</strong></p>

  [English](README.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md)
</div>

<br/>

**Second Brain** è un assistente desktop 100% gratuito e invisibile creato per aiutare i professionisti di tutto il mondo a eccellere nei loro colloqui di lavoro. Viene eseguito silenziosamente in background, ascolta il colloquio e genera suggerimenti di risposta in prima persona basati sul tuo curriculum e sulla descrizione della posizione.

Alimentato dall'inferenza ultra-veloce Llama-3 di [Groq](https://groq.com) e dal modello Whisper-large-v3, l'intero processo — dall'acquisizione vocale al suggerimento intelligente — avviene in pochi millisecondi.

## ✨ Funzionalità

- **Trascrizione Vocale in Tempo Reale**: Utilizza Whisper-v3 tramite l'API Groq per trascrivere il discorso dell'intervistatore con estrema precisione e velocità.
- **Suggerimenti Contestuali**: Analizza la conversazione in corso, il tuo curriculum e la descrizione della posizione per suggerire le migliori risposte possibili.
- **Supporto Multilingue**: Interfaccia e motore IA localizzati al 100% per Inglese, Portoghese, Spagnolo, Francese e Italiano.
- **Modalità Invisibile**: Costruito con Electron, può essere ridotto a icona per non disturbare mentre ti concentri sulla tua videochiamata.
- **Privacy al Primo Posto**: Il tuo curriculum, l'offerta di lavoro e le tue chiavi API vengono salvati esclusivamente nella memoria locale (`localStorage`) del tuo computer.

## 🚀 Guida Rapida (Download)

1. **Scarica il Programma di Installazione:**
   Ottieni l'ultimo `Second Brain Setup .exe` dalla nostra pagina [Releases](../../releases).
   
2. **Crea una Chiave API Groq Gratuita:**
   Vai su [console.groq.com](https://console.groq.com/keys) e genera una chiave API gratuita. È essenziale per eseguire il motore IA ad alta velocità.

3. **Installa e Configura:**
   - Apri l'applicazione.
   - Incolla la tua Chiave API.
   - Incolla il tuo Curriculum e la Descrizione della Posizione.
   - Seleziona la tua lingua.
   - Clicca su **Inizia il Colloquio** e sei pronto!

## 🛠️ Sviluppo (Per Programmatori)

Se desideri compilare il codice sorgente o contribuire:

### Prerequisiti
- Node.js 18+
- npm o yarn

### Installazione

```bash
git clone https://github.com/2brain/second-brain.git
cd second-brain

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

### Compilazione per la Produzione (Installatore)

```bash
# Compilare e generare l'installatore Electron
npm run dist
```
L'installatore `.exe` verrà generato all'interno della cartella `dist-installers`.

## 🤝 Sostieni il Progetto

Second Brain è open-source e gratuito per la comunità. Se questo strumento ti ha aiutato a ottenere un lavoro o a superare brillantemente un colloquio, offrici un caffè!

<a href="https://www.buymeacoffee.com/2brain" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 145px !important;" ></a>

## ❓ FAQ (Domande Frequenti)

**1. È davvero gratuito al 100%?**
Sì! L'applicazione è open-source e totalmente gratuita. Devi solo creare un account gratuito su Groq per ottenere la tua chiave API.

**2. I miei dati sono al sicuro? Salvate il mio curriculum?**
La tua privacy è la nostra priorità assoluta. Non abbiamo un database. La tua chiave API e il tuo curriculum vengono salvati rigorosamente sul tuo computer (`localStorage`). Nessun dato viene inviato ai nostri server.

**3. Qual è il modo migliore per compilare i campi "Curriculum" e "Lavoro"?**
Basta copiare e incollare l'intero testo grezzo del tuo curriculum (PDF o LinkedIn) e la descrizione del lavoro. Non preoccuparti della formattazione; l'IA di Second Brain organizzerà automaticamente i tuoi dati nella sua memoria per generare risposte con estrema precisione.

**4. Come posso testare il sistema senza essere in un vero colloquio?**
Puoi testarlo subito! Apri l'app, fai clic su "Ascolta" e riproduci un video di simulazione di colloquio su YouTube, oppure fai semplicemente finta di essere il selezionatore e fai una domanda ad alta voce.

**5. Cosa fare se non acquisisce l'audio? (Avviso sulle Cuffie)**
Second Brain ascolta tramite il microfono predefinito del sistema. Se usi cuffie con cancellazione del rumore, il microfono potrebbe non captare la voce del selezionatore che esce dalle cuffie. **Prova sempre il sistema prima di accedere a qualsiasi colloquio.** Se non capta la voce, usa gli altoparlanti del computer o regola le impostazioni di routing audio del sistema.

**6. Il selezionatore può vedere o sentire l'IA?**
No. Second Brain viene eseguito come una finestra indipendente. Non inserisce audio nel tuo microfono e non condivide il tuo schermo. È invisibile al 100%.

**7. Perché l'IA impiega alcuni secondi a rispondere?**
L'IA attende che il selezionatore termini un ragionamento completo prima di generare una risposta. Ascolta in blocchi di 7 secondi per assicurarsi di aver compreso l'intera domanda.

**8. Funziona su Mac o Linux?**
I programmi di installazione automatici (`.exe`) sono per Windows. Tuttavia, gli sviluppatori possono clonare questo repository ed eseguire `npm run dist` per compilare nativamente per macOS o Linux.

---

## 📝 Licenza

Distribuito con una Licenza Non Commerciale. Sei libero di utilizzare e studiare il software, ma **la vendita o la distribuzione commerciale è severamente vietata**. Consulta il file `LICENSE` per ulteriori informazioni.
