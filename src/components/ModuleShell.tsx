import { useState } from 'react'
import type { ReactNode } from 'react'
import Quiz from './Quiz'
import Esercizi from './Esercizi'
import type { Exercise } from './Esercizi'

type Tab = 'teoria' | 'sim' | 'esercizi' | 'quiz'

const TABS: { key: Tab; label: string }[] = [
  { key: 'teoria', label: 'Teoria' },
  { key: 'sim', label: 'Simulazioni' },
  { key: 'esercizi', label: 'Esercizi' },
  { key: 'quiz', label: 'Quiz' },
]

interface Props {
  theory: ReactNode
  sim: ReactNode
  exercises: Exercise[]
  quizTitle: string
  quizQuestions: any
}

export default function ModuleShell({ theory, sim, exercises, quizTitle, quizQuestions }: Props) {
  const [tab, setTab] = useState<Tab>('teoria')

  return (
    <>
      <div className="subtabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`subtab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: tab === 'teoria' ? 'block' : 'none' }}>{theory}</div>
      <div style={{ display: tab === 'sim' ? 'block' : 'none' }}>{sim}</div>
      <div style={{ display: tab === 'esercizi' ? 'block' : 'none' }}>
        <Esercizi exercises={exercises} />
      </div>
      <div style={{ display: tab === 'quiz' ? 'block' : 'none' }}>
        <Quiz title={quizTitle} questions={quizQuestions} />
      </div>
    </>
  )
}
