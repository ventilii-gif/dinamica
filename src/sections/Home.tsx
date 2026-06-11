import type { Section } from '../App'

interface Props { onNavigate: (s: Section) => void }

const cards: { key: Section; icon: string; title: string; sub: string }[] = [
  { key: 'newton',       icon: '⚡', title: 'Leggi di Newton',            sub: 'Inerzia, F=ma, azione-reazione' },
  { key: 'orizzontale',  icon: '➡️', title: 'Piano Orizzontale',          sub: 'Moto con e senza attrito, velocità iniziale qualsiasi' },
  { key: 'inclinato',    icon: '↗️', title: 'Piano Inclinato',             sub: 'Forze lungo il piano, angolo e attrito' },
  { key: 'attrito',      icon: '🔴', title: 'Attrito Statico e Dinamico', sub: 'μₛ e μₖ, la transizione dal riposo al moto' },
  { key: 'applicazioni', icon: '🔗', title: 'Applicazioni Combinate',     sub: 'Problemi reali con tutti i concetti' },
]

export default function Home({ onNavigate }: Props) {
  return (
    <>
      <div className="home-hero">
        <h1>Principi della Dinamica</h1>
        <p>
          Studia il moto degli oggetti sotto l'azione delle forze. Dalle tre leggi di Newton
          ai piani inclinati con attrito, con simulazioni interattive e quiz di verifica.
        </p>
        <blockquote style={{
          fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.95rem',
          maxWidth: 520, margin: '0 auto', lineHeight: 1.6,
          borderLeft: '3px solid var(--accent)', paddingLeft: '1rem', textAlign: 'left'
        }}>
          "Se ho visto più lontano, è perché stavo sulle spalle di giganti."
          <br />
          <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--muted)', fontSize: '0.85rem' }}>
            — Isaac Newton
          </span>
        </blockquote>
      </div>

      <div className="home-grid">
        {cards.map(({ key, icon, title, sub }) => (
          <button key={key} className="home-card" onClick={() => onNavigate(key)}>
            <span className="home-card-icon">{icon}</span>
            <span className="home-card-title">{title}</span>
            <span className="home-card-sub">{sub}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2>🚀 Come usare questa app</h2>
        <p>
          Ogni sezione ha <strong style={{ color: 'var(--primary)' }}>tre parti</strong>: una sezione di
          <strong style={{ color: 'var(--primary)' }}> teoria</strong> con formule ed esempi numerici;
          una <strong style={{ color: 'var(--green)' }}>simulazione interattiva</strong> con animazione 2D
          e grafici sincronizzati; un <strong style={{ color: 'var(--accent)' }}>quiz finale</strong> da 8 domande.
        </p>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>Consiglio: inizia dalla simulazione — muovi i cursori e osserva cosa cambia. La teoria diventa intuitiva.</span>
        </div>
      </div>

      <div className="card">
        <h2>✨ Lo sapevi?</h2>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {[
            ['🚗', 'Un\'auto che frena da 100 km/h a 0 in 4 s ha un\'accelerazione media di −6.9 m/s² (circa 0.7 g)'],
            ['🏔️', 'Su un piano inclinato di 30° senza attrito, qualsiasi oggetto accelera a 4.9 m/s² — la metà di g'],
            ['🛷', 'Il ghiaccio ha μ_c ≈ 0.03: per questo le slitte scivolano così bene!'],
            ['🚀', 'Un Falcon 9 pesa ~550 000 kg al lancio e i motori producono ~7 700 000 N di spinta'],
            ['⚽', 'Un pallone calciato a 30 m/s su erba asciutta (μ ≈ 0.5) percorre circa 91 m prima di fermarsi'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.91rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
