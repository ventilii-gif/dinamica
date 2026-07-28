import { createContext, useContext, useState, useEffect } from 'react'
import Home from './sections/Home'
import LeggiNewton from './sections/LeggiNewton'
import PianoOrizzontale from './sections/PianoOrizzontale'
import PianoInclinato from './sections/PianoInclinato'
import Attrito from './sections/Attrito'
import ApplicazioniCombinate from './sections/ApplicazioniCombinate'

export type Section = 'intro' | 'newton' | 'orizzontale' | 'inclinato' | 'attrito' | 'applicazioni'
type Theme = 'light' | 'dark'

interface NavCtx { section: Section; setSection: (s: Section) => void }
export const NavContext = createContext<NavCtx>({ section: 'intro', setSection: () => {} })
export const useNav = () => useContext(NavContext)

const navItems: { key: Section; label: string; num?: string }[] = [
  { key: 'intro',        label: 'Introduzione' },
  { key: 'newton',       label: 'Leggi di Newton',      num: '1' },
  { key: 'orizzontale',  label: 'Piano Orizzontale',    num: '2' },
  { key: 'inclinato',    label: 'Piano Inclinato',      num: '3' },
  { key: 'attrito',      label: 'Attrito',              num: '4' },
  { key: 'applicazioni', label: 'Applicazioni',         num: '5' },
]

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch { /* ignore */ }
  return 'light'
}

// Applica il tema prima del primo render per evitare il lampeggio
const initialTheme = getInitialTheme()
document.documentElement.setAttribute('data-theme', initialTheme)

export default function App() {
  const [section, setSection] = useState<Section>('intro')
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  return (
    <NavContext.Provider value={{ section, setSection }}>
      <header className="header">
        <div>
          <div className="header-brand">Principi della Dinamica</div>
          <div className="header-sub">Fisica per il liceo &middot; teoria, simulazioni, esercizi &amp; quiz</div>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
          aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          title="Cambia tema (il tema scuro riduce il consumo su schermi OLED)"
        >
          {theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}
        </button>
      </header>

      <nav className="nav">
        {navItems.map(({ key, label, num }) => (
          <button
            key={key}
            className={`nav-btn${section === key ? ' active' : ''}`}
            onClick={() => setSection(key)}
          >
            {num && <span className="nav-num">{num}</span>}
            {label}
          </button>
        ))}
      </nav>

      <main key={section} className="section-enter">
        {section === 'intro'        && <Home onNavigate={setSection} />}
        {section === 'newton'       && <LeggiNewton />}
        {section === 'orizzontale'  && <PianoOrizzontale />}
        {section === 'inclinato'    && <PianoInclinato />}
        {section === 'attrito'      && <Attrito />}
        {section === 'applicazioni' && <ApplicazioniCombinate />}
      </main>
    </NavContext.Provider>
  )
}
