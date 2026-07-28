import { useState } from 'react'

export interface Exercise {
  q: string
  hints: string[]
  solution: string
}

function ExerciseCard({ ex, idx }: { ex: Exercise; idx: number }) {
  const [hints, setHints] = useState(0)
  const [sol, setSol] = useState(false)

  return (
    <div className="ex-card">
      <div className="ex-q"><strong>Esercizio {idx + 1}.</strong> {ex.q}</div>

      {hints > 0 && (
        <div className="ex-hints">
          {ex.hints.slice(0, hints).map((h, i) => (
            <div key={i} className="ex-hint">
              <span className="ex-hint-label">Suggerimento {i + 1}</span>
              {h}
            </div>
          ))}
        </div>
      )}

      <div className="ex-actions">
        {hints < ex.hints.length && (
          <button className="btn btn-ghost" onClick={() => setHints(n => n + 1)}>
            {hints === 0 ? 'Mostra suggerimento' : 'Suggerimento successivo'}
          </button>
        )}
        {!sol && <button className="btn" onClick={() => setSol(true)}>Mostra soluzione</button>}
      </div>

      {sol && (
        <div className="ex-solution">
          <span className="ex-solution-label">Soluzione</span>
          {ex.solution}
        </div>
      )}
    </div>
  )
}

export default function Esercizi({ exercises }: { exercises: Exercise[] }) {
  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h2>Esercizi</h2>
        <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
          Prova a risolvere ogni problema da solo. Se ti blocchi, chiedi un suggerimento alla volta:
          vengono svelati uno per volta. La soluzione completa è sempre disponibile.
        </p>
      </div>
      {exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} idx={i} />)}
    </div>
  )
}
