import { i18n } from '../i18n'
import { useLang } from '../App'

type Section = 'home' | 'spaceTime' | 'dynamics' | 'invariants' | 'minkowski'

const sectionKeys: Section[] = ['spaceTime', 'dynamics', 'invariants', 'minkowski']

interface Props { onNavigate: (s: Section) => void }

export default function Home({ onNavigate }: Props) {
  const { lang } = useLang()
  const t = i18n[lang].home

  return (
    <>
      <div className="home-hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <blockquote style={{
          fontStyle: 'italic',
          color: 'var(--accent)',
          fontSize: '0.95rem',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.6,
          borderLeft: '3px solid var(--accent)',
          paddingLeft: '1rem',
          textAlign: 'left'
        }}>
          {t.quote}
          <br />
          <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--muted)', fontSize: '0.85rem' }}>
            {t.quoteBy}
          </span>
        </blockquote>
      </div>

      <div className="home-grid">
        {sectionKeys.map((key, i) => {
          const card = t.cards[i]
          return (
            <button key={key} className="home-card" onClick={() => onNavigate(key)}>
              <span className="home-card-icon">{card.icon}</span>
              <span className="home-card-title">{card.title}</span>
              <span className="home-card-sub">{card.sub}</span>
            </button>
          )
        })}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2>
          {lang === 'it' ? '🚀 Come funziona questa app' : '🚀 How this app works'}
        </h2>
        <p>
          {lang === 'it'
            ? 'Ogni sezione ha tre parti: teoria con formule e esempi, una simulazione interattiva in cui puoi esplorare i concetti con cursori e grafici, e un quiz finale per testare la tua comprensione.'
            : 'Each section has three parts: theory with formulas and examples, an interactive simulation where you can explore concepts with sliders and graphs, and a final quiz to test your understanding.'}
        </p>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>
            {lang === 'it'
              ? 'Consiglio: inizia dalla simulazione — muovi i cursori e osserva cosa cambia. La teoria diventerà intuitiva.'
              : 'Tip: start from the simulation — move the sliders and observe what changes. The theory will become intuitive.'}
          </span>
        </div>
        <div className="info-box example">
          <span className="info-box-icon">🎬</span>
          <span>
            {lang === 'it'
              ? 'Trovi esempi reali (GPS, muoni, LHC) e riferimenti a film come Interstellar per ancorare ogni concetto alla realtà.'
              : 'You\'ll find real examples (GPS, muons, LHC) and references to films like Interstellar to anchor each concept to reality.'}
          </span>
        </div>
      </div>

      {/* Quick facts */}
      <div className="card">
        <h2>{lang === 'it' ? '✨ Fatti che ti stupiranno' : '✨ Facts that will amaze you'}</h2>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {(lang === 'it' ? [
            ['⏱️', 'A β = 0.99c, il tempo scorre 7× più lento su un razzo rispetto alla Terra'],
            ['📏', 'La Stazione Spaziale ISS è lunga ~0.00000001% in meno di quanto sarebbe a riposo'],
            ['⚡', '1 kg di massa convertita al 100%: abbastanza energia per tutto il fabbisogno italiano per ~3 anni'],
            ['🌌', 'I protoni del LHC completano 11.245 giri al secondo — a β = 0.999999991c'],
            ['🛰️', 'I satelliti GPS hanno bisogno di correzioni relativistiche: senza, l\'errore di posizione sarebbe >10 km/giorno'],
          ] : [
            ['⏱️', 'At β = 0.99c, time runs 7× slower on a rocket compared to Earth'],
            ['📏', 'The ISS is ~0.00000001% shorter than it would be at rest'],
            ['⚡', '1 kg of mass fully converted: enough energy for Italy\'s entire consumption for ~3 years'],
            ['🌌', 'LHC protons complete 11,245 laps per second — at β = 0.999999991c'],
            ['🛰️', 'GPS satellites need relativistic corrections: without them, position error would be >10 km/day'],
          ]).map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.92rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              <span style={{ color: 'var(--text)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
