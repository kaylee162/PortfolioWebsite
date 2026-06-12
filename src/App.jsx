import { useMemo, useState, useEffect } from 'react'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { featuredProjects } from './data/projects'

/* ─── Pixel Star Field ──────────────────────────────────────── */
function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 38 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.6 ? 2 : Math.random() < 0.85 ? 3 : 4,
      dur: `${2.5 + Math.random() * 3}s`,
      delay: `${Math.random() * 4}s`,
      opacity: 0.06 + Math.random() * 0.1,
    }))
  }, [])

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            '--dur': s.dur,
            '--delay': s.delay,
            '--base-opacity': s.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ─── App ───────────────────────────────────────────────────── */
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

  /* Scroll-reveal: add .in-view when sections enter the viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff2f4] text-ink">
      {/* Scanline overlay — subtle CRT texture */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Pixel star background */}
      <StarField />

      {/* Floating decorative clouds */}
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="sparkle-field" aria-hidden="true">✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
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

      <Skills
        skillsWindowMode={skillsWindowMode}
        setSkillsWindowMode={setSkillsWindowMode}
        scrollToSection={scrollToSection}
      />

      <Contact />
    </main>
  )
}

export default App