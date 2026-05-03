import { createContext, useContext, useState } from 'react'
import { i18n, type Lang } from './i18n'
import Home from './sections/Home'
import SpaceTime from './sections/SpaceTime'
import Dynamics from './sections/Dynamics'
import Invariants from './sections/Invariants'
import MinkowskiSection from './sections/MinkowskiSection'

type Section = 'home' | 'spaceTime' | 'dynamics' | 'invariants' | 'minkowski'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
export const LangContext = createContext<LangCtx>({ lang: 'it', setLang: () => {} })
export const useLang = () => useContext(LangContext)

export default function App() {
  const [lang, setLang] = useState<Lang>('it')
  const [section, setSection] = useState<Section>('home')
  const t = i18n[lang]

  const navItems: { key: Section; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'spaceTime', label: t.nav.spaceTime },
    { key: 'dynamics', label: t.nav.dynamics },
    { key: 'invariants', label: t.nav.invariants },
    { key: 'minkowski', label: t.nav.minkowski },
  ]

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <header className="header">
        <div className="header-brand">
          ✦ <span>Relatività</span> Speciale
        </div>
        <div className="lang-toggle">
          <button
            className={`lang-btn${lang === 'it' ? ' active' : ''}`}
            onClick={() => setLang('it')}
          >IT</button>
          <button
            className={`lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
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

      <main key={`${section}-${lang}`} className="section-enter">
        {section === 'home'       && <Home onNavigate={setSection} />}
        {section === 'spaceTime'  && <SpaceTime />}
        {section === 'dynamics'   && <Dynamics />}
        {section === 'invariants' && <Invariants />}
        {section === 'minkowski'  && <MinkowskiSection />}
      </main>
    </LangContext.Provider>
  )
}
