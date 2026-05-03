import { useState, useMemo } from 'react'
import { i18n } from '../i18n'
import { useLang } from '../App'
import Quiz from '../components/Quiz'

function gamma(beta: number) { return 1 / Math.sqrt(1 - beta * beta) }

function ClockSim({ beta, lang }: { beta: number; lang: 'it' | 'en' }) {
  const g = gamma(beta)
  const L0 = 100
  const L = L0 / g

  const W = 500, H = 200
  const rocketW = Math.max(20, L / L0 * 200)
  const rocketH = 50

  // Earth clock (full size box) on left; rocket (contracted) on right
  const earthX = 60, rocketX = 320
  const Y = 75

  // Clock hand angle based on gamma (slower for rocket)
  const angle = (v: number) => `rotate(${v}, 0, 0)`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg" style={{ background: 'rgba(0,0,0,0.4)' }}>
      {/* Earth frame */}
      <rect x={earthX} y={Y} width={100} height={rocketH} rx="6" fill="rgba(79,195,247,0.15)" stroke="#4fc3f7" strokeWidth="1.5" />
      <text x={earthX + 50} y={Y - 10} textAnchor="middle" fill="#4fc3f7" fontSize="11">
        {lang === 'it' ? 'Terra (fermo)' : 'Earth (rest)'}
      </text>
      {/* Clock face Earth */}
      <circle cx={earthX + 50} cy={Y + 25} r="18" fill="none" stroke="#4fc3f7" strokeWidth="1.5" />
      <line x1={earthX + 50} y1={Y + 25} x2={earthX + 50} y2={Y + 10} stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" />
      <text x={earthX + 50} y={Y + 60} textAnchor="middle" fill="#4fc3f7" fontSize="10">Δt = {g.toFixed(2)}s</text>

      {/* Rocket frame */}
      <rect x={rocketX} y={Y} width={rocketW} height={rocketH} rx="6" fill="rgba(255,213,79,0.12)" stroke="#ffd54f" strokeWidth="1.5" />
      {/* Rocket nose cone */}
      <polygon
        points={`${rocketX + rocketW},${Y} ${rocketX + rocketW},${Y + rocketH} ${rocketX + rocketW + 18},${Y + rocketH / 2}`}
        fill="rgba(255,213,79,0.2)" stroke="#ffd54f" strokeWidth="1.2"
      />
      <text x={rocketX + rocketW / 2} y={Y - 10} textAnchor="middle" fill="#ffd54f" fontSize="11">
        {lang === 'it' ? 'Razzo (β=' : 'Rocket (β='}{beta.toFixed(2)})
      </text>
      {/* Clock face rocket (ticks slower) */}
      <circle cx={rocketX + rocketW / 2} cy={Y + 25} r="18" fill="none" stroke="#ffd54f" strokeWidth="1.5" />
      {/* Rocket clock hand points to 12 (proper time = 1s) */}
      <line x1={rocketX + rocketW / 2} y1={Y + 25} x2={rocketX + rocketW / 2} y2={Y + 10} stroke="#ffd54f" strokeWidth="2" strokeLinecap="round" />
      <text x={rocketX + rocketW / 2} y={Y + 60} textAnchor="middle" fill="#ffd54f" fontSize="10">Δτ = 1.00s</text>

      {/* Motion arrow */}
      <line x1={rocketX - 60} y1={Y + 25} x2={rocketX - 10} y2={Y + 25} stroke="#ffd54f" strokeWidth="1.5" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ffd54f" />
        </marker>
      </defs>
      <text x={rocketX - 35} y={Y + 15} fill="#ffd54f" fontSize="10" textAnchor="middle">v = βc</text>

      {/* Length label */}
      <line x1={rocketX} y1={Y + rocketH + 12} x2={rocketX + rocketW} y2={Y + rocketH + 12} stroke="#ffd54f" strokeWidth="1" />
      <text x={rocketX + rocketW / 2} y={Y + rocketH + 25} textAnchor="middle" fill="#ffd54f" fontSize="10">
        L = {L.toFixed(1)} m
      </text>

      {/* Gamma ratio visual */}
      <text x={W / 2} y={H - 10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
        {lang === 'it' ? 'Per ogni 1s sul razzo, sulla Terra: ' : 'For every 1s on rocket, on Earth: '}{g.toFixed(3)}s
      </text>
    </svg>
  )
}

export default function SpaceTime() {
  const { lang } = useLang()
  const t = i18n[lang].spaceTime
  const [beta, setBeta] = useState(0.6)
  const g = useMemo(() => gamma(beta), [beta])

  return (
    <>
      <div className="card">
        <h2>{t.title}</h2>

        <h3>{t.sec1Title}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{t.sec1Text}</p>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec1Tip}</span>
        </div>

        <h3>{t.sec2Title}</h3>
        <p>{t.sec2Text}</p>
        <div className="formula">{t.sec2Formula1}</div>
        <div className="formula highlight">{t.sec2Formula2}</div>

        <h3>{t.sec3Title}</h3>
        <p>{t.sec3Text}</p>
        <div className="formula highlight">{t.sec3Formula}</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec3Tip}</span>
        </div>

        <h3>{t.sec4Title}</h3>
        <p>{t.sec4Text}</p>
        <div className="formula highlight">{t.sec4Formula}</div>
        <div className="info-box warn">
          <span className="info-box-icon">⚠️</span>
          <span>{t.sec4Tip}</span>
        </div>
      </div>

      {/* Examples */}
      <div className="card">
        <h2>{t.ex1Title}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{t.ex1Text}</p>
      </div>

      <div className="card">
        <h2>{t.ex2Title}</h2>
        <p>{t.ex2Text}</p>
        <div className="info-box cinema">
          <span className="info-box-icon">🎬</span>
          <span>
            {lang === 'it'
              ? 'Il film è fisicamente accurato nella descrizione della dilatazione temporale. Christopher Nolan ha lavorato con il fisico Kip Thorne (Nobel 2017) per i calcoli.'
              : 'The film is physically accurate in describing time dilation. Christopher Nolan worked with physicist Kip Thorne (Nobel 2017) for the calculations.'}
          </span>
        </div>
      </div>

      {/* Simulation */}
      <div className="sim-card">
        <h2>🔬 {t.simTitle}</h2>

        <div className="ctrl-row">
          <span className="ctrl-label">{t.simBeta}</span>
          <input
            type="range" min="0" max="0.999" step="0.001" value={beta}
            onChange={e => setBeta(+e.target.value)}
          />
          <span className="ctrl-value">{beta.toFixed(3)}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{t.simBetaDesc}</p>

        <ClockSim beta={beta} lang={lang} />

        {/* Gamma bar */}
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '3px' }}>
            <span>γ = 1</span>
            <span>γ = {g.toFixed(3)}</span>
            <span>γ → ∞</span>
          </div>
          <div className="gamma-bar">
            <div className="gamma-fill" style={{ width: `${Math.min(100, (beta / 0.999) * 100)}%` }} />
          </div>
        </div>

        <div className="readouts">
          <div className="readout">
            <span className="readout-label">{t.readGamma}</span>
            <span className="readout-value">{g.toFixed(4)}</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readDt} (Δτ=1s)</span>
            <span className="readout-value">{g.toFixed(4)} s</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readDtau}</span>
            <span className="readout-value">1.0000 s</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readL} ({t.readL0})</span>
            <span className="readout-value">{(100 / g).toFixed(2)} m</span>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--primary)', marginTop: '0.75rem' }}>{t.simNote}</p>
      </div>

      <Quiz title={t.quiz.title} questions={t.quiz.questions} />
    </>
  )
}
