import { motion } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { Sparkles } from 'lucide-react'
import WindowFrame from './WindowFrame'
import HeroProfileCard from './HeroProfileCard'
import FlappyDuckGame from '../FlappyDuckGame'
import OceanScapeGame from '../OceanScapeGame'

const heroCards = ['profile', 'flappy-duck', 'oceanscape']

const heroCardUrls = {
  profile: 'https://kayleesportfolio.dev',
  'flappy-duck': 'https://flappyduck.dev',
  oceanscape: 'https://ocean.dev',
}

/* ─── Mouse-reactive gradient title ──────────────────────────── */
function HeroTitle() {
  const titleRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = titleRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    titleRef.current.style.setProperty('--mouse-x', `${x}%`)
    titleRef.current.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    titleRef.current?.style.setProperty('--mouse-x', '25%')
    titleRef.current?.style.setProperty('--mouse-y', '35%')
  }, [])

  return (
    <h1
      ref={titleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-title font-display text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-7xl"
    >
      <span>creative full-stack</span>
      <span>and frontend developer</span>
    </h1>
  )
}

/* ─── Hero section ────────────────────────────────────────────── */
function Hero({
  heroWindowMode,
  setHeroWindowMode,
  activeHeroCard,
  setActiveHeroCard,
  skillsRestoreVisible,
  scrollToSection,
}) {
  const heroWindowVisible = heroWindowMode === 'open' || heroWindowMode === 'maximized'
  const heroWindowMaximized = heroWindowMode === 'maximized'
  const heroRestoreVisible = heroWindowMode === 'minimized'

  return (
    <section
      id="home"
      className={`relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-16 transition-all duration-500 ${
        heroWindowVisible && !heroWindowMaximized ? 'lg:grid-cols-[1.1fr_.9fr]' : 'lg:grid-cols-1'
      }`}
    >
      <motion.div
        layout
        className={`hero-copy ${heroWindowVisible && !heroWindowMaximized ? 'hero-copy-with-window' : 'hero-copy-expanded'}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          layout: { type: 'spring', stiffness: 55, damping: 20, mass: 1.8 },
          opacity: { duration: 0.45, ease: 'easeOut' },
          y: { duration: 0.7, ease: 'easeOut' },
        }}
      >
        <HeroTitle />

        <p className="hero-description mt-6 text-lg leading-8 text-ink/75">
          hi! i'm Kaylee Henry, a computer science student at Georgia Tech who enjoys designing and building modern web applications with a focus on user experience and design. 
          i have a passion for creating intuitive and visually appealing interfaces that provide a seamless user experience.
        </p>
        <div className="quick-scan mt-6">
          <span>Georgia Tech CS</span>
          <span>Front-end Dev</span>
          <span>Full-stack Dev</span>
          <span>UI / UX Design</span>
          <span>Atlanta, GA</span>
        </div>
      </motion.div>

      {heroRestoreVisible && (
        <button
          type="button"
          className={`restore-window-button hero-restore-button ${skillsRestoreVisible ? 'restore-button-stacked' : ''}`}
          onClick={() => {
            scrollToSection('home')
            setHeroWindowMode('open')
          }}
        >
          open profile window
        </button>
      )}

      {heroWindowVisible && (
        <motion.div
          layout
          className={heroWindowMaximized ? 'hero-window-maximized' : ''}
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            layout: { type: 'spring', stiffness: 60, damping: 18, mass: 1.6 },
            opacity: { duration: 0.35, ease: 'easeOut' },
            scale: { duration: 0.5, ease: 'easeOut' },
            rotate: { duration: 0.5, ease: 'easeOut' },
          }}
        >
          <WindowFrame
            label="DEVELOPER"
            accent="bg-coral"
            url={heroCardUrls[activeHeroCard]}
            interactive
            isMaximized={heroWindowMaximized}
            onClose={() => setHeroWindowMode('closed')}
            onMinimize={() => setHeroWindowMode(heroWindowMaximized ? 'open' : 'minimized')}
            onMaximize={() => {
              if (!heroWindowMaximized) setHeroWindowMode('maximized')
            }}
            onRefresh={() => {
              setActiveHeroCard((currentCard) => {
                const currentIndex = heroCards.indexOf(currentCard)
                return heroCards[(currentIndex + 1) % heroCards.length]
              })
              setHeroWindowMode('maximized')
            }}
          >
            {activeHeroCard === 'flappy-duck' ? (
              <FlappyDuckGame />
            ) : activeHeroCard === 'oceanscape' ? (
              <OceanScapeGame />
            ) : (
              <HeroProfileCard isMaximized={heroWindowMaximized} />
            )}
          </WindowFrame>
        </motion.div>
      )}
    </section>
  )
}

export default Hero