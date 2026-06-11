import type { Section } from '../App'

interface Props { onNavigate: (s: Section) => void }

const cards: { key: Section; num: string; title: string; sub: string }[] = [
  { key: 'newton',       num: '1', title: 'Leggi di Newton',            sub: 'Inerzia, F = ma, azione e reazione' },
  { key: 'orizzontale',  num: '2', title: 'Piano Orizzontale',          sub: 'Moto con e senza attrito, velocità iniziale qualsiasi' },
  { key: 'inclinato',    num: '3', title: 'Piano Inclinato',             sub: 'Forze lungo il piano, angolo e attrito' },
  { key: 'attrito',      num: '4', title: 'Attrito Statico e Dinamico', sub: 'Coefficienti μₛ e μₖ, transizione dal riposo al moto' },
  { key: 'applicazioni', num: '5', title: 'Applicazioni Combinate',     sub: 'Problemi reali con tutti i concetti insieme' },
]

export default function Home({ onNavigate }: Props) {
  return (
    <>
      <div className="home-hero">
        <h1>Principi della Dinamica</h1>
        <p>
          Studia il moto degli oggetti sotto l&apos;azione delle forze. Dalle tre leggi di Newton
          ai piani inclinati con attrito: teoria, simulazioni interattive e quiz di verifica.
        </p>
      </div>

      <div className="home-grid">
        {cards.map(({ key, num, title, sub }) => (
          <button key={key} className="home-card" onClick={() => onNavigate(key)}>
            <span className="home-card-num">{num}</span>
            <span className="home-card-title">{title}</span>
            <span className="home-card-sub">{sub}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2>Come usare questa app</h2>
        <p>
          Ogni sezione ha <strong>tre parti</strong>: una sezione di
          <strong> teoria</strong> con formule ed esempi numerici;
          una <strong>simulazione interattiva</strong> con animazione 2D
          e grafici sincronizzati; un <strong>quiz finale</strong> da 8 domande.
        </p>
        <div className="info-box tip">
          <span className="info-box-icon">Consiglio:</span>
          <span>Inizia dalla simulazione, muovi i cursori e osserva cosa cambia. La teoria diventa intuitiva.</span>
        </div>
      </div>

      <div className="card">
        <h2>Lo sapevi?</h2>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {[
            'Un\'auto che frena da 100 km/h a 0 in 4 s ha un\'accelerazione media di −6,9 m/s² (circa 0,7 g).',
            'Su un piano inclinato di 30° senza attrito qualsiasi oggetto accelera a 4,9 m/s², la metà di g.',
            'Il ghiaccio ha μ_c ≈ 0,03: per questo le slitte scivolano così bene.',
            'Un Falcon 9 pesa circa 550 000 kg al lancio e i motori producono 7 700 000 N di spinta.',
            'Un pallone calciato a 30 m/s su erba asciutta (μ ≈ 0,5) percorre circa 91 m prima di fermarsi.',
          ].map((text, i) => (
            <p key={i} style={{ fontSize: '0.91rem', marginBottom: 0 }}>{text}</p>
          ))}
        </div>
      </div>
    </>
  )
}
