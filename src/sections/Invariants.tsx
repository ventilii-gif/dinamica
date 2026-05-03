import { useState } from 'react'
import { i18n } from '../i18n'
import { useLang } from '../App'
import Quiz from '../components/Quiz'

interface Event { x: number; t: number }

function IntervalSim({ lang }: { lang: 'it' | 'en' }) {
  const t = i18n[lang].invariants
  const [A, setA] = useState<Event>({ x: 0, t: 0 })
  const [B, setB] = useState<Event>({ x: 2, t: 3 })

  const dx = B.x - A.x
  const dt = B.t - A.t
  // Using c = 1 (light-years and years)
  const s2 = dt * dt - dx * dx
  const type = Math.abs(s2) < 0.001 ? 'lightlike' : s2 > 0 ? 'timelike' : 'spacelike'
  const badgeClass = type === 'timelike' ? 'interval-timelike' : type === 'spacelike' ? 'interval-spacelike' : 'interval-lightlike'
  const typeLabel = type === 'timelike' ? t.timelike : type === 'spacelike' ? t.spacelike : t.lightlike

  const properVal = type === 'timelike'
    ? `τ = ${Math.sqrt(s2).toFixed(3)} ${lang === 'it' ? 'anni' : 'years'}`
    : type === 'spacelike'
    ? `d = ${Math.sqrt(-s2).toFixed(3)} ${lang === 'it' ? 'a.l.' : 'l.y.'}`
    : `s² = 0`

  // SVG spacetime diagram for the two events
  const W = 400, H = 280
  const cx = 80, cy = 200
  const scale = 40

  function toSVG(x: number, t: number) {
    return { px: cx + x * scale, py: cy - t * scale }
  }

  const pA = toSVG(A.x, A.t)
  const pB = toSVG(B.x, B.t)

  // Light cone from A
  const lcFR = { px: pA.px + 4 * scale, py: pA.py - 4 * scale }
  const lcFL = { px: pA.px - 4 * scale, py: pA.py - 4 * scale }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {[
          { label: t.event1, ev: A, set: setA, color: '#74c0fc' },
          { label: t.event2, ev: B, set: setB, color: '#ff6b6b' },
        ].map(({ label, ev, set, color }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.75rem', border: `1px solid ${color}40` }}>
            <div style={{ color, fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{label}</div>
            <div className="ctrl-row" style={{ gridTemplateColumns: '60px 1fr 50px' }}>
              <span className="ctrl-label" style={{ fontSize: '0.82rem' }}>{t.coordX}</span>
              <input type="range" min="-4" max="4" step="0.1" value={ev.x}
                onChange={e => set(prev => ({ ...prev, x: +e.target.value }))} />
              <span className="ctrl-value" style={{ color }}>{ev.x.toFixed(1)}</span>
            </div>
            <div className="ctrl-row" style={{ gridTemplateColumns: '60px 1fr 50px' }}>
              <span className="ctrl-label" style={{ fontSize: '0.82rem' }}>{t.coordT}</span>
              <input type="range" min="-3" max="6" step="0.1" value={ev.t}
                onChange={e => set(prev => ({ ...prev, t: +e.target.value }))} />
              <span className="ctrl-value" style={{ color }}>{ev.t.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg" style={{ background: 'rgba(0,0,0,0.4)' }}>
        {/* Axes */}
        <line x1={10} y1={cy} x2={W - 10} y2={cy} stroke="#4fc3f7" strokeWidth="1.2" />
        <line x1={cx} y1={H - 10} x2={cx} y2={10} stroke="#4fc3f7" strokeWidth="1.2" />
        <text x={W - 18} y={cy + 16} fill="#4fc3f7" fontSize="11">x</text>
        <text x={cx + 6} y={18} fill="#4fc3f7" fontSize="11">ct</text>

        {/* Light cone from A */}
        <line x1={pA.px} y1={pA.py} x2={lcFR.px} y2={lcFR.py} stroke="#ffd54f" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1={pA.px} y1={pA.py} x2={lcFL.px} y2={lcFL.py} stroke="#ffd54f" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />

        {/* Spacetime interval line */}
        <line x1={pA.px} y1={pA.py} x2={pB.px} y2={pB.py}
          stroke={type === 'timelike' ? '#69f0ae' : type === 'spacelike' ? '#ff5252' : '#ffd54f'}
          strokeWidth="2" strokeDasharray={type === 'spacelike' ? '6 3' : ''} />

        {/* Events */}
        <circle cx={pA.px} cy={pA.py} r="8" fill="#74c0fc" opacity="0.9" />
        <text x={pA.px + 10} y={pA.py - 6} fill="#74c0fc" fontSize="12" fontWeight="700">A</text>

        <circle cx={pB.px} cy={pB.py} r="8" fill="#ff6b6b" opacity="0.9" />
        <text x={pB.px + 10} y={pB.py - 6} fill="#ff6b6b" fontSize="12" fontWeight="700">B</text>

        {/* Ticks */}
        {[-3,-2,-1,1,2,3,4,5].map(n => (
          <g key={n}>
            <line x1={cx + n * scale} y1={cy - 3} x2={cx + n * scale} y2={cy + 3} stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4" />
            <text x={cx + n * scale} y={cy + 14} fill="#4fc3f7" fontSize="8" textAnchor="middle" opacity="0.4">{n}</text>
            {n > 0 && n < 6 && (
              <>
                <line x1={cx - 3} y1={cy - n * scale} x2={cx + 3} y2={cy - n * scale} stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4" />
                <text x={cx - 12} y={cy - n * scale + 4} fill="#4fc3f7" fontSize="8" opacity="0.4">{n}</text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Result */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
        <div className="readout">
          <span className="readout-label">Δx</span>
          <span className="readout-value">{dx.toFixed(2)}</span>
        </div>
        <div className="readout">
          <span className="readout-label">cΔt</span>
          <span className="readout-value">{dt.toFixed(2)}</span>
        </div>
        <div className="readout">
          <span className="readout-label">
            {t.resultTitle}
            <span className={`interval-badge ${badgeClass}`}>{typeLabel}</span>
          </span>
          <span className="readout-value" style={{ color: type === 'timelike' ? '#69f0ae' : type === 'spacelike' ? '#ff5252' : '#ffd54f' }}>
            {s2.toFixed(3)}
          </span>
        </div>
      </div>
      <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', fontSize: '0.88rem' }}>
        <span style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{properVal}</span>
      </div>
    </div>
  )
}

export default function Invariants() {
  const { lang } = useLang()
  const t = i18n[lang].invariants

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

        <div className="info-box tip" style={{ marginBottom: '0.5rem' }}>
          <span className="info-box-icon">🟢</span>
          <div>
            <strong>{t.sec2Time}</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem' }}>{t.sec2TimeText}</p>
          </div>
        </div>
        <div className="info-box" style={{ background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.25)', color: '#ff8a80', marginBottom: '0.5rem' }}>
          <span className="info-box-icon">🔴</span>
          <div>
            <strong>{t.sec2Space}</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem' }}>{t.sec2SpaceText}</p>
          </div>
        </div>
        <div className="info-box warn">
          <span className="info-box-icon">🟡</span>
          <div>
            <strong>{t.sec2Light}</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem' }}>{t.sec2LightText}</p>
          </div>
        </div>

        <h3>{t.sec3Title}</h3>
        <p>{t.sec3Text}</p>
        <div className="formula highlight">{t.sec3Formula}</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec3Tip}</span>
        </div>

        <h3>{t.sec4Title}</h3>
        <p>{t.sec4Text}</p>
        <div className="formula">{t.sec4Formula1}</div>
        <div className="formula">{t.sec4Formula2}</div>
        <p>{t.sec4Text2}</p>
        <div className="formula highlight">{t.sec4Formula3}</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec4Tip}</span>
        </div>
      </div>

      <div className="card">
        <h2>{t.ex1Title}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{t.ex1Text}</p>
        <div className="info-box cinema">
          <span className="info-box-icon">🚀</span>
          <span>
            {lang === 'it'
              ? 'La stella più vicina alla Terra, Proxima Centauri, potrebbe essere raggiunta in pochi mesi di tempo proprio con un\'astronave sufficientemente veloce — ma dalla Terra sarebbero passati anni.'
              : 'The closest star to Earth, Proxima Centauri, could be reached in a few months of proper time with a sufficiently fast spaceship — but years would have passed on Earth.'}
          </span>
        </div>
      </div>

      <div className="sim-card">
        <h2>🔬 {t.simTitle}</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{t.simNote}</p>
        <IntervalSim lang={lang} />
      </div>

      <Quiz title={t.quiz.title} questions={t.quiz.questions} />
    </>
  )
}
