import { createContext, useContext, useState } from 'react'
import Home from './sections/Home'
import LeggiNewton from './sections/LeggiNewton'
import PianoOrizzontale from './sections/PianoOrizzontale'
import PianoInclinato from './sections/PianoInclinato'
import Attrito from './sections/Attrito'
import ApplicazioniCombinate from './sections/ApplicazioniCombinate'

export type Section = 'home' | 'newton' | 'orizzontale' | 'inclinato' | 'attrito' | 'applicazioni'

interface NavCtx { section: Section; setSection: (s: Section) => void }
export const NavContext = createContext<NavCtx>({ section: 'home', setSection: () => {} })
export const useNav = () => useContext(NavContext)

const navItems: { key: Section; label: string }[] = [
  { key: 'home',         label: '🏠 Home' },
  { key: 'newton',       label: '⚡ Leggi di Newton' },
  { key: 'orizzontale',  label: '➡️ Piano Orizzontale' },
  { key: 'inclinato',    label: '↗️ Piano Inclinato' },
  { key: 'attrito',      label: '🔴 Attrito' },
  { key: 'applicazioni', label: '🔗 Applicazioni' },
]

export default function App() {
  const [section, setSection] = useState<Section>('home')

  return (
    <NavContext.Provider value={{ section, setSection }}>
      <header className="header">
        <div className="header-brand">
          ⚡ <span>Principi</span> della Dinamica
        </div>
      </header>

      <nav className="nav">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            className={`nav-btn${section === key ? ' active' : ''}`}
            onClick={() => setSection(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main key={section} className="section-enter">
        {section === 'home'         && <Home onNavigate={setSection} />}
        {section === 'newton'       && <LeggiNewton />}
        {section === 'orizzontale'  && <PianoOrizzontale />}
        {section === 'inclinato'    && <PianoInclinato />}
        {section === 'attrito'      && <Attrito />}
        {section === 'applicazioni' && <ApplicazioniCombinate />}
      </main>
    </NavContext.Provider>
  )
}
