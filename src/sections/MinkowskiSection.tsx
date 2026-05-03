import { useState } from 'react'
import { i18n } from '../i18n'
import { useLang } from '../App'
import MinkowskiDiagram from '../components/MinkowskiDiagram'
import Quiz from '../components/Quiz'

export default function MinkowskiSection() {
  const { lang } = useLang()
  const t = i18n[lang].minkowski
  const [beta, setBeta] = useState(0)
  const [showGrid, setShowGrid] = useState(false)

  const g = beta > 0 ? 1 / Math.sqrt(1 - beta * beta) : 1
  const alpha = Math.atan(beta) * (180 / Math.PI)

  return (
    <>
      <div className="card">
        <h2>{t.title}</h2>

        <h3>{t.sec1Title}</h3>
        <p>{t.sec1Text}</p>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>{t.sec1Tip}</span>
        </div>

        <h3>{t.sec2Title}</h3>
        <p>{t.sec2Text}</p>

        <h3>{t.sec3Title}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{t.sec3Text}</p>
        <div className="formula">α = arctan(β) → {lang === 'it' ? 'entrambi gli assi si avvicinano al cono di luce' : 'both axes approach the light cone'}</div>
        <div className="info-box warn">
          <span className="info-box-icon">⚠️</span>
          <span>{t.sec3Tip}</span>
        </div>

        <h3>{t.sec4Title}</h3>
        <p>{t.sec4Text}</p>
        <div className="info-box example">
          <span className="info-box-icon">⚗️</span>
          <span>
            {lang === 'it'
              ? 'Il paradosso dei gemelli non è un vero paradosso. La situazione è asimmetrica: solo il gemello viaggiante ha accelerato. Nel diagramma, la traiettoria a V ha tempo proprio minore della linea retta.'
              : 'The twin paradox is not a real paradox. The situation is asymmetric: only the travelling twin accelerated. In the diagram, the V-shaped trajectory has less proper time than the straight line.'}
          </span>
        </div>
      </div>

      {/* Static explanation diagram */}
      <div className="card card-accent">
        <h2>{lang === 'it' ? '📊 Come leggere il diagramma' : '📊 How to read the diagram'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {(lang === 'it' ? [
            { icon: '📍', title: 'Evento', text: 'Un punto nel diagramma = un evento (un luogo in un istante)' },
            { icon: '➡️', title: 'Linea del mondo', text: 'La storia di un oggetto nel tempo. Verticale = fermo. Inclinata = in moto.' },
            { icon: '⚡', title: 'Cono di luce', text: 'Le rette a ±45°. Niente può uscire dal cono (andrebbe più veloce di c).' },
            { icon: '📐', title: 'Assi S\'', text: 'Si inclinano come il cono di luce all\'aumentare di v. MAI oltre i 45°.' },
          ] : [
            { icon: '📍', title: 'Event', text: 'A point in the diagram = an event (a place at an instant).' },
            { icon: '➡️', title: 'Worldline', text: 'The history of an object through time. Vertical = at rest. Tilted = in motion.' },
            { icon: '⚡', title: 'Light cone', text: 'The ±45° lines. Nothing can exit the cone (that would be faster than c).' },
            { icon: '📐', title: "S' axes", text: "They tilt toward the light cone as v increases. NEVER beyond 45°." },
          ]).map(({ icon, title, text }) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>{title}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--muted)' }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive diagram */}
      <div className="sim-card">
        <h2>🔬 {t.simTitle}</h2>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{t.simNote}</p>

        <div className="ctrl-row">
          <span className="ctrl-label">{t.simBeta}</span>
          <input
            type="range" min="0" max="0.995" step="0.005" value={beta}
            onChange={e => setBeta(+e.target.value)}
          />
          <span className="ctrl-value">{beta.toFixed(3)}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', margin: '0.75rem 0', flexWrap: 'wrap' }}>
          <button
            className={`btn${showGrid ? '' : ' btn-ghost'}`}
            onClick={() => setShowGrid(g => !g)}
            style={{ fontSize: '0.82rem' }}
          >
            {showGrid ? '✓ ' : ''}{t.toggleGrid}
          </button>
          <button
            className="btn btn-ghost"
            style={{ fontSize: '0.82rem' }}
            onClick={() => setBeta(0)}
          >
            {lang === 'it' ? 'Reset S\'' : "Reset S'"}
          </button>
        </div>

        {beta > 0 && (
          <div className="readouts" style={{ marginBottom: '0.75rem' }}>
            <div className="readout">
              <span className="readout-label">β (v/c)</span>
              <span className="readout-value">{beta.toFixed(3)}</span>
            </div>
            <div className="readout">
              <span className="readout-label">γ</span>
              <span className="readout-value">{g.toFixed(4)}</span>
            </div>
            <div className="readout">
              <span className="readout-label">α (inclinazione)</span>
              <span className="readout-value">{alpha.toFixed(1)}°</span>
            </div>
            <div className="readout">
              <span className="readout-label">{lang === 'it' ? 'Distanza da 45°' : 'Distance from 45°'}</span>
              <span className="readout-value">{(45 - alpha).toFixed(1)}°</span>
            </div>
          </div>
        )}

        <MinkowskiDiagram beta={beta} showGrid={showGrid} lang={lang} />

        {/* Twin paradox demonstration */}
        {beta > 0 && (
          <div className="info-box tip" style={{ marginTop: '0.75rem' }}>
            <span className="info-box-icon">👩‍🚀</span>
            <span>
              {lang === 'it'
                ? `A β = ${beta.toFixed(2)}, il gemello viaggiante accumula γ = ${g.toFixed(2)} volte meno tempo del gemello fermo per ogni unità di ct.`
                : `At β = ${beta.toFixed(2)}, the travelling twin accumulates γ = ${g.toFixed(2)}× less time than the stationary twin per unit of ct.`}
            </span>
          </div>
        )}
      </div>

      {/* Lorentz transform table */}
      {beta > 0 && (
        <div className="card">
          <h2>{lang === 'it' ? '🔢 Trasformazione di Lorentz' : '🔢 Lorentz Transformation'}</h2>
          <div className="formula">
            {lang === 'it' ? "Da S a S' (β = " : "From S to S' (β = "}{beta.toFixed(3)}, γ = {g.toFixed(4)}):
          </div>
          <div className="formula">x' = γ(x − β·ct) = {g.toFixed(3)}·(x − {beta.toFixed(3)}·ct)</div>
          <div className="formula">ct' = γ(ct − β·x) = {g.toFixed(3)}·(ct − {beta.toFixed(3)}·x)</div>
          <div className="info-box tip">
            <span className="info-box-icon">✓</span>
            <span>
              {lang === 'it'
                ? `Verifica invariante: per qualsiasi evento (x, ct), vale sempre (ct')² − (x')² = (ct)² − (x)²`
                : `Invariant check: for any event (x, ct), always (ct')² − (x')² = (ct)² − (x)²`}
            </span>
          </div>
        </div>
      )}

      <Quiz title={t.quiz.title} questions={t.quiz.questions} />
    </>
  )
}
