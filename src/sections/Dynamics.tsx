import { useState, useMemo } from 'react'
import { i18n } from '../i18n'
import { useLang } from '../App'
import Quiz from '../components/Quiz'

function gamma(beta: number) { return 1 / Math.sqrt(1 - beta * beta) }

// Given K in units of mc², find beta
function betaFromK(K: number) {
  const g = K + 1  // gamma = K/mc² + 1
  return Math.sqrt(1 - 1 / (g * g))
}

function AcceleratorSim({ K, lang }: { K: number; lang: 'it' | 'en' }) {
  const g = K + 1
  const beta = betaFromK(K)
  const p = g * beta  // in units of mc
  const E = g         // in units of mc²

  const W = 500, H = 220

  // Bar showing v/c
  const barW = 380
  const barX = 60
  const barY = 90
  const fill = beta * barW

  // Particle visual
  const px_part = barX + fill
  const partR = 10

  // Classical comparison
  const betaClassical = Math.min(0.999, Math.sqrt(2 * K / 1) / 1)  // classical: K = ½mv² → v=√(2K/m) in units of c

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg" style={{ background: 'rgba(0,0,0,0.4)' }}>
      {/* Track */}
      <rect x={barX} y={barY + partR} width={barW} height={8} rx="4" fill="rgba(79,195,247,0.08)" stroke="rgba(79,195,247,0.2)" strokeWidth="1" />

      {/* Classical limit marker */}
      {betaClassical < 1 && (
        <>
          <line x1={barX + betaClassical * barW} y1={barY - 5} x2={barX + betaClassical * barW} y2={barY + partR * 2 + 20}
            stroke="#ff7043" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
          <text x={barX + betaClassical * barW} y={barY - 12} fill="#ff7043" fontSize="9" textAnchor="middle" opacity="0.7">
            {lang === 'it' ? 'classica' : 'classical'}
          </text>
        </>
      )}

      {/* c limit marker */}
      <line x1={barX + barW} y1={barY - 5} x2={barX + barW} y2={barY + partR * 2 + 20}
        stroke="#ffd54f" strokeWidth="2" />
      <text x={barX + barW + 4} y={barY + partR + 6} fill="#ffd54f" fontSize="12" fontWeight="700">c</text>

      {/* Particle (glowing ball) */}
      <circle cx={barX + fill} cy={barY + partR + 4} r={partR} fill="rgba(79,195,247,0.3)" stroke="#4fc3f7" strokeWidth="2" />
      <circle cx={barX + fill} cy={barY + partR + 4} r={5} fill="#4fc3f7" />

      {/* Beta label */}
      <text x={barX + fill} y={barY + partR * 2 + 22} textAnchor="middle" fill="#4fc3f7" fontSize="10">
        β = {beta.toFixed(5)}
      </text>

      {/* Scale */}
      <text x={barX} y={barY + partR * 2 + 38} fill="rgba(255,255,255,0.3)" fontSize="9">β=0</text>
      <text x={barX + barW / 2 - 12} y={barY + partR * 2 + 38} fill="rgba(255,255,255,0.3)" fontSize="9">β=0.5</text>

      {/* Energy bar (vertical) */}
      <text x={20} y={30} fill="var(--muted)" fontSize="10" textAnchor="middle">E</text>
      <rect x={14} y={40} width={12} height={140} rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x={14} y={40 + 140 - Math.min(140, E / 30 * 140)} width={12} height={Math.min(140, E / 30 * 140)} rx="3"
        fill="url(#eGrad)" />
      <defs>
        <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#ff7043" />
        </linearGradient>
      </defs>
      <text x={20} y={185} fill="var(--muted)" fontSize="8" textAnchor="middle">0</text>
      <text x={20} y={45} fill="var(--accent)" fontSize="9" textAnchor="middle">{E.toFixed(1)}</text>

      {/* Approaching c warning */}
      {beta > 0.99 && (
        <text x={W / 2} y={H - 10} textAnchor="middle" fill="#ff7043" fontSize="10" fontStyle="italic">
          {lang === 'it' ? '⚠ β = 0.99: ci vuole 7× più energia per ogni 0.001 di aumento!' : '⚠ β = 0.99: 7× more energy needed for every 0.001 increase!'}
        </text>
      )}
    </svg>
  )
}

export default function Dynamics() {
  const { lang } = useLang()
  const t = i18n[lang].dynamics
  const [K, setK] = useState(1)

  const g = K + 1
  const beta = useMemo(() => betaFromK(K), [K])
  const p = g * beta
  const E = g

  return (
    <>
      <div className="card">
        <h2>{t.title}</h2>

        <h3>{t.sec1Title}</h3>
        <p>{t.sec1Text}</p>
        <div className="formula highlight">{t.sec1Formula}</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec1Tip}</span>
        </div>

        <h3>{t.sec2Title}</h3>
        <p>{t.sec2Text}</p>
        <div className="formula highlight">{t.sec2Formula1}</div>
        <p>{t.sec2Text2}</p>
        <div className="formula highlight">{t.sec2Formula2}</div>
        <p>{t.sec2Text3}</p>
        <div className="formula">{t.sec2Formula3}</div>
        <div className="info-box warn">
          <span className="info-box-icon">⚠️</span>
          <span>{t.sec2Tip}</span>
        </div>

        <h3>{t.sec3Title}</h3>
        <p>{t.sec3Text}</p>
        <div className="formula highlight">{t.sec3Formula}</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec3Tip}</span>
        </div>
      </div>

      <div className="card">
        <h2>{t.sec4Title}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{t.sec4Text}</p>
      </div>

      <div className="card">
        <h2>{t.ex2Title}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{t.ex2Text}</p>
        <div className="info-box example">
          <span className="info-box-icon">💥</span>
          <span>
            {lang === 'it'
              ? 'La bomba di Hiroshima convertì ~700 mg di massa in energia (su ~64 kg di uranio). L\'efficienza era meno dell\'1%.'
              : 'The Hiroshima bomb converted ~700 mg of mass into energy (out of ~64 kg of uranium). Efficiency was less than 1%.'}
          </span>
        </div>
      </div>

      {/* Simulation */}
      <div className="sim-card">
        <h2>🔬 {t.simTitle}</h2>
        <div className="ctrl-row">
          <span className="ctrl-label">{t.simEnergy}</span>
          <input type="range" min="0" max="20" step="0.01" value={K}
            onChange={e => setK(+e.target.value)} />
          <span className="ctrl-value">{K.toFixed(2)}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{t.simEnergyDesc}</p>

        <AcceleratorSim K={K} lang={lang} />

        <div className="readouts">
          <div className="readout">
            <span className="readout-label">{t.readBeta}</span>
            <span className="readout-value">{beta.toFixed(6)}</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readGamma}</span>
            <span className="readout-value">{g.toFixed(4)}</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readMomentum}</span>
            <span className="readout-value">{p.toFixed(4)}</span>
          </div>
          <div className="readout">
            <span className="readout-label">{t.readEnergy}</span>
            <span className="readout-value">{E.toFixed(4)}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.75rem' }}>{t.cLimit}</p>

        {/* E-p invariant check */}
        <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', background: 'rgba(105,240,174,0.07)', borderRadius: 8, border: '1px solid rgba(105,240,174,0.2)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--green)' }}>
            {lang === 'it' ? '✓ Verifica: E² − (pc)² = ' : '✓ Check: E² − (pc)² = '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              {(E * E - p * p).toFixed(4)}
            </span>
            {' = (mc)² = 1 ✓'}
          </span>
        </div>
      </div>

      <Quiz title={t.quiz.title} questions={t.quiz.questions} />
    </>
  )
}
