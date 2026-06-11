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

const navItems: { key: Section; label: string; num?: string }[] = [
  { key: 'home',         label: 'Home' },
  { key: 'newton',       label: 'Leggi di Newton',      num: '1' },
  { key: 'orizzontale',  label: 'Piano Orizzontale',    num: '2' },
  { key: 'inclinato',    label: 'Piano Inclinato',      num: '3' },
  { key: 'attrito',      label: 'Attrito',              num: '4' },
  { key: 'applicazioni', label: 'Applicazioni',         num: '5' },
]

export default function App() {
  const [section, setSection] = useState<Section>('home')

  return (
    <NavContext.Provider value={{ section, setSection }}>
      <header className="header">
        <div className="header-brand">Principi della Dinamica</div>
        <div className="header-sub">Fisica per il liceo &middot; teoria, simulazioni animate &amp; quiz</div>
      </header>

      <nav className="nav">
        {navItems.map(({ key, label, num }) => (
          <button
            key={key}
            className={`nav-btn${section === key ? ' active' : ''}`}
            onClick={() => setSection(key)}
          >
            <span className="nav-num">{num ?? '•'}</span>
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
