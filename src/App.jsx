import { useMemo, useState } from 'react'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { featuredProjects } from './data/projects'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [heroWindowMode, setHeroWindowMode] = useState('open')
  const [activeHeroCard, setActiveHeroCard] = useState('profile')
  const [skillsWindowMode, setSkillsWindowMode] = useState('open')

  const skillsRestoreVisible = skillsWindowMode === 'minimized'

  const visibleProjects = useMemo(() => {
    if (activeCategory === 'All') return featuredProjects
    return featuredProjects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff2f4] text-ink">
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <div className="cloud cloud-one"></div>
        <div className="cloud cloud-two"></div>
        <div className="sparkle-field">✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
      </div>

      <Nav />

      <Hero
        heroWindowMode={heroWindowMode}
        setHeroWindowMode={setHeroWindowMode}
        activeHeroCard={activeHeroCard}
        setActiveHeroCard={setActiveHeroCard}
        skillsRestoreVisible={skillsRestoreVisible}
        scrollToSection={scrollToSection}
      />

      <About />

      <Projects
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        visibleProjects={visibleProjects}
      />

      <Skills skillsWindowMode={skillsWindowMode} setSkillsWindowMode={setSkillsWindowMode} scrollToSection={scrollToSection} />

      <Contact />
    </main>
  )
}

export default App
