import type { Section } from '../App'

interface Props { onNavigate: (s: Section) => void }

const moduli: { key: Section; num: string; title: string; sub: string }[] = [
  { key: 'newton',       num: '1', title: 'Leggi di Newton',            sub: 'Inerzia, F = ma, azione e reazione' },
  { key: 'orizzontale',  num: '2', title: 'Piano Orizzontale',          sub: 'Moto con e senza attrito, velocità iniziale qualsiasi' },
  { key: 'inclinato',    num: '3', title: 'Piano Inclinato',            sub: 'Scomposizione del peso, angolo e attrito' },
  { key: 'attrito',      num: '4', title: 'Attrito Statico e Dinamico', sub: 'Coefficienti μₛ e μₖ, dal riposo al moto' },
  { key: 'applicazioni', num: '5', title: 'Applicazioni Combinate',     sub: 'Problemi reali con tutti i concetti insieme' },
]

const parti: [string, string, string][] = [
  ['1', 'Teoria', 'Definizioni, formule ed esempi numerici già svolti, con riquadri di approfondimento e avvertenze sugli errori più frequenti.'],
  ['2', 'Simulazioni', 'Animazioni interattive: sposti i cursori di massa, forza, angolo o attrito e vedi cambiare in tempo reale le frecce delle forze e i grafici di velocità e spazio.'],
  ['3', 'Esercizi', 'Problemi da affrontare in autonomia, con suggerimenti che puoi svelare uno alla volta e la soluzione completa passo-passo.'],
  ['4', 'Quiz', 'Otto domande a risposta multipla con spiegazione immediata e punteggio finale, per verificare quanto hai capito.'],
]

const obiettivi: string[] = [
  'Riconoscere tutte le forze che agiscono su un corpo e disegnarne lo schema di corpo libero.',
  'Applicare la seconda legge di Newton scegliendo gli assi di riferimento più convenienti.',
  'Scomporre la forza peso lungo un piano inclinato e calcolare correttamente la forza normale.',
  'Distinguere attrito statico e dinamico e prevedere se un corpo si mette in moto oppure resta fermo.',
  'Collegare le forze alla cinematica: ricavare accelerazione, velocità, spazio percorso e tempi di arresto.',
  'Risolvere problemi che combinano piano inclinato, attrito e velocità iniziale non nulla.',
]

const storia: [string, string, string][] = [
  ['IV sec. a.C.', 'Aristotele',
    'Sostiene che ogni corpo tenda naturalmente alla quiete e che per mantenere un moto sia sempre necessaria una forza. È un’idea intuitiva — la carretta si ferma se smetti di spingerla — ma sbagliata, perché trascura l’attrito. Domina il pensiero per quasi duemila anni.'],
  ['1543', 'Niccolò Copernico',
    'Con il “De revolutionibus orbium coelestium” sposta il Sole al centro del sistema planetario. La Terra diventa un corpo in moto come gli altri: cade così l’idea che esistano luoghi e moti “naturali” privilegiati.'],
  ['1609–1619', 'Giovanni Keplero',
    'Analizzando le osservazioni di Tycho Brahe formula le tre leggi dei moti planetari: orbite ellittiche, aree uguali in tempi uguali, relazione fra periodo e distanza. Sono leggi empiriche, che descrivono senza ancora spiegare.'],
  ['1638', 'Galileo Galilei',
    'Nei “Discorsi e dimostrazioni matematiche” studia i piani inclinati e la caduta dei gravi. Intuisce il principio d’inerzia (senza attriti il moto si conserva), dimostra che tutti i corpi cadono con la stessa accelerazione e fonda il metodo sperimentale.'],
  ['1673', 'Christiaan Huygens',
    'Nell’“Horologium Oscillatorium” studia il pendolo e ricava l’espressione della forza centripeta nel moto circolare, introducendo strumenti matematici che Newton userà poco dopo.'],
  ['1687', 'Isaac Newton',
    'Nei “Philosophiae Naturalis Principia Mathematica” enuncia le tre leggi della dinamica e la legge di gravitazione universale. Dimostra che le stesse leggi governano la caduta di una mela e l’orbita della Luna: nasce la meccanica classica.'],
  ['XVIII sec.', 'Euler, d’Alembert e Lagrange',
    'Riscrivono le leggi di Newton nel linguaggio del calcolo infinitesimale. La “Mécanique analytique” di Lagrange (1788) dà alla meccanica la forma matematica generale che usiamo ancora oggi.'],
  ['1883', 'Ernst Mach',
    'Nella “Meccanica nel suo sviluppo storico-critico” mette in discussione i concetti newtoniani di spazio e tempo assoluti e propone una definizione operativa di massa. Le sue critiche influenzeranno direttamente Einstein.'],
  ['1905', 'Albert Einstein',
    'Con la relatività ristretta mostra che le leggi di Newton sono un’ottima approssimazione, valida finché le velocità sono molto minori di quella della luce. La meccanica classica non viene demolita, ma inquadrata nei suoi limiti.'],
]

export default function Home({ onNavigate }: Props) {
  return (
    <>
      <div className="home-hero">
        <h1>Principi della Dinamica</h1>
        <p>
          Perché gli oggetti si muovono come si muovono? Un percorso in cinque moduli
          per collegare le forze al moto, dalle tre leggi di Newton ai piani inclinati
          con attrito: teoria, simulazioni interattive, esercizi guidati e quiz.
        </p>
      </div>

      <div className="card">
        <h2>Che cos’è la dinamica</h2>
        <p>
          La <strong>cinematica</strong> descrive <em>come</em> si muove un corpo: dove si trova,
          quanto è veloce, come accelera. La <strong>dinamica</strong> fa un passo in più e spiega
          <em> perché</em> quel moto avviene, mettendo in relazione il movimento con le
          <strong> forze</strong> che agiscono sul corpo.
        </p>
        <p>
          Tutto ruota attorno a una sola idea, sorprendentemente semplice: la forza non serve a
          mantenere il moto, ma a <strong>cambiarlo</strong>. Un corpo lasciato a sé stesso non si
          ferma da solo: rallenta perché qualcosa — di solito l’attrito — lo frena. Capire questo
          punto significa aver capito il cuore della meccanica classica.
        </p>
        <div className="formula highlight">F<sub>netta</sub> = m · a</div>
        <p style={{ marginBottom: 0 }}>
          Da questa singola relazione, applicata con attenzione alla geometria del problema,
          discende tutto ciò che studierai in queste pagine.
        </p>
      </div>

      <div className="card">
        <h2>Il percorso</h2>
        <p>
          I cinque moduli sono pensati per essere affrontati in ordine: ognuno aggiunge un
          ingrediente al problema precedente. Si parte dai principi generali, si passa al caso più
          semplice (il piano orizzontale), si inclina il piano, si introduce l’attrito in modo
          rigoroso e infine si combinano tutti gli elementi in problemi realistici.
        </p>
        <div className="home-grid">
          {moduli.map(({ key, num, title, sub }) => (
            <button key={key} className="home-card" onClick={() => onNavigate(key)}>
              <span className="home-card-num">{num}</span>
              <span className="home-card-title">{title}</span>
              <span className="home-card-sub">{sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Com’è organizzato ogni modulo</h2>
        <p>
          Dentro ciascuna scheda trovi quattro sotto-schede, da percorrere nell’ordine che preferisci:
        </p>
        <div className="step-grid">
          {parti.map(([n, titolo, desc]) => (
            <div className="step-item" key={n}>
              <div className="step-num">{n}</div>
              <div>
                <div className="step-title">{titolo}</div>
                <div className="step-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="info-box tip" style={{ marginTop: '0.9rem' }}>
          Un consiglio: parti dalla simulazione e gioca con i cursori prima di leggere la teoria.
          Vedere che cosa succede rende molto più naturale capire il perché.
        </div>
      </div>

      <div className="card">
        <h2>Che cosa saprai fare alla fine</h2>
        <ul className="goal-list">
          {obiettivi.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>

      <div className="card">
        <h2>Che cosa ti serve sapere già</h2>
        <p>
          Per seguire senza difficoltà conviene avere familiarità con i <strong>vettori</strong>
          {' '}(somma, scomposizione lungo due assi), con le <strong>leggi del moto uniformemente
          accelerato</strong> e con le funzioni <strong>seno e coseno</strong> di un angolo, che
          useremo in continuazione sul piano inclinato.
        </p>
        <p style={{ marginBottom: 0 }}>
          Se vuoi ripassare, questi due percorsi sono complementari a quello che stai per iniziare:
        </p>
        <div className="link-row">
          <a className="link-chip" href="https://ventilii-gif.github.io/vettori/" target="_blank" rel="noopener noreferrer">Vettori</a>
          <a className="link-chip" href="https://ventilii-gif.github.io/statica/" target="_blank" rel="noopener noreferrer">Statica</a>
        </div>
      </div>

      <div className="card">
        <h2>Riferimenti storici</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Le leggi che studierai in poche settimane hanno richiesto più di duemila anni per essere
          formulate. Ripercorrerne la storia aiuta a capire perché alcuni concetti — primo fra tutti
          l’inerzia — risultino inizialmente così poco intuitivi.
        </p>
        <div className="timeline">
          {storia.map(([anno, nome, testo]) => (
            <div className="timeline-item" key={nome}>
              <div className="timeline-year">{anno}</div>
              <div className="timeline-body">
                <div className="timeline-name">{nome}</div>
                <div className="timeline-text">{testo}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="info-box example" style={{ marginTop: '1rem' }}>
          <span>
            <strong>Da tenere a mente:</strong> la meccanica classica che stai per studiare non è
            stata “superata”. Resta lo strumento con cui si progettano ponti, automobili e sonde
            spaziali: è esatta per tutti gli oggetti di dimensioni ordinarie che si muovono a
            velocità molto minori di quella della luce.
          </span>
        </div>
      </div>
    </>
  )
}
