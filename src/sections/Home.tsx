import type { Section } from '../App'

interface Props { onNavigate: (s: Section) => void }

const cards: { key: Section; num: string; title: string; sub: string }[] = [
  { key: 'newton',       num: '1', title: 'Leggi di Newton',            sub: 'Inerzia, F = ma, azione e reazione' },
  { key: 'orizzontale',  num: '2', title: 'Piano Orizzontale',          sub: 'Moto con e senza attrito, velocità iniziale qualsiasi' },
  { key: 'inclinato',    num: '3', title: 'Piano Inclinato',             sub: 'Forze lungo il piano, angolo e attrito' },
  { key: 'attrito',      num: '4', title: 'Attrito Statico e Dinamico', sub: 'Coefficienti μₛ e μₖ, dal riposo al moto' },
  { key: 'applicazioni', num: '5', title: 'Applicazioni Combinate',     sub: 'Problemi reali con tutti i concetti insieme' },
]

const storia: [string, string, string][] = [
  ['IV sec. a.C.', 'Aristotele', 'Sosteneva che ogni corpo tenda naturalmente alla quiete e che per mantenere un moto sia sempre necessaria una forza: un\'idea intuitiva ma errata, che dominò il pensiero per quasi due millenni.'],
  ['1638', 'Galileo Galilei', 'Studiando i piani inclinati e la caduta dei gravi, intuisce il principio d\'inerzia: in assenza di attriti un corpo mantiene il proprio moto. Fonda il metodo sperimentale.'],
  ['1687', 'Isaac Newton', 'Nei “Philosophiae Naturalis Principia Mathematica” enuncia le tre leggi della dinamica e la gravitazione universale, unificando il moto dei corpi terrestri e celesti: nasce la meccanica classica.'],
  ['XVIII sec.', 'Euler e d\'Alembert', 'Traducono le leggi di Newton nel linguaggio del calcolo infinitesimale, dando alla meccanica la forma matematica che usiamo ancora oggi.'],
]

export default function Home({ onNavigate }: Props) {
  return (
    <>
      <div className="home-hero">
        <h1>Principi della Dinamica</h1>
        <p>
          Studia il moto degli oggetti sotto l&apos;azione delle forze. Dalle tre leggi di Newton
          ai piani inclinati con attrito: un percorso in cinque moduli, ciascuno con teoria,
          simulazioni interattive, esercizi guidati e quiz di verifica.
        </p>
      </div>

      <div className="card">
        <h2>Che cosa affronterai</h2>
        <p>
          La <strong>dinamica</strong> è la parte della fisica che spiega <em>perché</em> gli oggetti si
          muovono come si muovono: collega le <strong>forze</strong> che agiscono su un corpo al suo
          <strong> moto</strong>. Partiremo dai principi fondamentali di Newton per poi applicarli a
          situazioni via via più concrete: un blocco su un piano orizzontale, la discesa lungo un piano
          inclinato, il ruolo dell&apos;attrito e infine problemi che combinano tutti questi elementi.
        </p>
        <p>
          Ogni modulo è diviso in quattro parti, che trovi nelle sotto-schede in alto:
          <strong> Teoria</strong> con formule ed esempi, <strong>Simulazioni</strong> interattive con
          cursori e grafici, <strong>Esercizi</strong> con suggerimenti passo-passo a richiesta, e un
          <strong> Quiz</strong> finale da otto domande.
        </p>
      </div>

      <div className="card">
        <h2>Un po&apos; di storia</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Il cammino che ha portato alle leggi della dinamica è durato più di duemila anni.
        </p>
        <div className="timeline">
          {storia.map(([year, name, text]) => (
            <div className="timeline-item" key={name}>
              <div className="timeline-year">{year}</div>
              <div className="timeline-body">
                <div className="timeline-name">{name}</div>
                <div className="timeline-text">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>I moduli</h2>
        <div className="home-grid">
          {cards.map(({ key, num, title, sub }) => (
            <button key={key} className="home-card" onClick={() => onNavigate(key)}>
              <span className="home-card-num">{num}</span>
              <span className="home-card-title">{title}</span>
              <span className="home-card-sub">{sub}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
