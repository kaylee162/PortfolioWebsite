import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MousePointer2,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react'
import profilePic from './assets/profilepic2.jpg'
import './App.css'
import FlappyDuckGame from './FlappyDuckGame'
import OceanScapeGame from './OceanScapeGame'

const featuredProjects = [
  {
    title: 'BuzzedIn',
    type: 'Full-stack job search app',
    category: 'Django',
    description:
      'A dashboard for Georgia Tech students to track applications, browse jobs, and connect with employer tools. Includes Google Maps API, SQL data models, and job seeker / recruiter flows.',
    tags: ['Django', 'Python', 'SQL', 'Google Maps API', 'JavaScript'],
    link: 'https://github.com/kaylee162/BuzzedIn.git',
  },
  {
    title: 'College Study Site',
    type: 'Tutoring platform',
    category: 'Django',
    description:
      'A location-based tutoring platform where tutors create sessions and students filter by tags, location, and availability. Includes mapped discovery and Twilio-powered messaging.',
    tags: ['Django', 'Python', 'Twilio', 'Google Maps API'],
    link: 'https://github.com/kaylee162/CollegeStudySite.git',
  },
  {
    title: 'Beyond the Sky',
    type: 'GBA game project',
    category: 'Game Dev',
    description:
      'A Game Boy Advance platformer with Mode 0 backgrounds, tilemaps, sprite animation, collision maps, resource collection, and a growing beanstalk world progression system.',
    tags: ['C', 'GBA', 'Game Design', 'Sprites', 'Tilemaps'],
    link: '#projects',
  },
  {
    title: 'Crypto Insights Dashboard',
    type: 'Data dashboard',
    category: 'React',
    description:
      'A real-time crypto dashboard with live Bitcoin and Ethereum metrics, interactive UI states, and auto-updating data cards.',
    tags: ['React', 'Express', 'Charts', 'API'],
    link: 'https://github.com/kaylee162/CryptoInsights',
  },
  {
    title: 'Space Launch Tracker',
    type: 'Launch dashboard',
    category: 'React',
    description:
      'A React and Vite dashboard that tracks upcoming launches with mission details, live countdowns, and data from The Space Devs API.',
    tags: ['React', 'Vite', 'API', 'UX'],
    link: 'https://github.com/kaylee162/SpaceTracker',
  },
  {
    title: 'Minesweeper',
    type: 'Java game',
    category: 'Java',
    description:
      'A classic Minesweeper game built with Java Swing, bomb detection, flagging, and recursive field clearing logic.',
    tags: ['Java', 'Swing GUI', 'Algorithms'],
    link: 'https://github.com/kaylee162/Minesweeper.git',
  },
]

const skills = [
  'React',
  'Vite',
  'Flask',
  'Next.js',
  'Express',
  'MongoDB',
  'Node.js',
  'Vue.js',
  'Tailwind',
  'Bootstrap',
  'Django',
  'JavaScript',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'SQL',
  'PostgreSQL',
  '.NET',
  'Typescript',
  'HTML/CSS',
  'Git',
  'UI/UX',
  'Figma',
  'Microsoft Office',
  'Adobe Creative Suite',
  'Agile Methodologies',
]

const categories = ['All', 'React', 'Django', 'Game Dev', 'Java']

function WindowFrame({
  children,
  label = 'DEVELOPER',
  accent = 'bg-coral',
  url = 'https://kayleesportfolio.dev',
  interactive = false,
  isMaximized = false,
  onClose,
  onMinimize,
  onMaximize,
  onRefresh,
}) {
  return (
    <div className={`window-frame shadow-pixel ${isMaximized ? 'is-maximized' : ''}`}>
      <div className="browser-top">
        <div className="traffic">
          <button
            type="button"
            aria-label="Close window"
            onClick={interactive ? onClose : undefined}
          ></button>

          <button
            type="button"
            aria-label="Minimize window"
            onClick={interactive ? onMinimize : undefined}
          ></button>

          <button
            type="button"
            aria-label="Maximize window"
            onClick={interactive ? onMaximize : undefined}
          ></button>
        </div>

        <div className="tab">{label}</div>
        <div className={`search-pill ${accent}`}>CREATIVE AND INTERACTIVE!</div>
      </div>

      <div className="url-bar">
        <button
          type="button"
          className="refresh"
          onClick={interactive ? onRefresh : undefined}
          aria-label="Refresh card"
        >
          ↻
        </button>

        <span className="url">{url}</span>
        <span className="mailbox">✉</span>
      </div>

      {children}
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')

  const [heroWindowMode, setHeroWindowMode] = useState('open')
  // open, minimized, closed, maximized

  const heroCards = ['profile', 'flappy-duck', 'oceanscape']
  const [activeHeroCard, setActiveHeroCard] = useState('profile')
  
  const heroCardUrls = {
    profile: 'https://kayleesportfolio.dev',
    'flappy-duck': 'https://flappyduck.dev',
    oceanscape: 'https://ocean.dev',
  }

  const heroWindowVisible = heroWindowMode === 'open' || heroWindowMode === 'maximized'
  const heroWindowMaximized = heroWindowMode === 'maximized'
  
  const [skillsWindowMode, setSkillsWindowMode] = useState('open')
  // open, minimized, closed, maximized

  const skillsWindowVisible = skillsWindowMode === 'open' || skillsWindowMode === 'maximized'
  const skillsWindowMaximized = skillsWindowMode === 'maximized'

  const heroRestoreVisible = heroWindowMode === 'minimized'
  const skillsRestoreVisible = skillsWindowMode === 'minimized'
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  
  const visibleProjects = useMemo(() => {
    if (activeCategory === 'All') return featuredProjects
    return featuredProjects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff2f4] text-ink">
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <div className="cloud cloud-one"></div>
        <div className="cloud cloud-two"></div>
        <div className="sparkle-field">✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
      </div>

      <nav className="sticky top-0 z-50 border-b-4 border-ink bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a
            href="#home"
            className="flex items-center gap-3 font-pixel text-xl tracking-wide"
          >
            <span>KAYLEE.EXE</span>
          </a>
          <div className="hidden items-center gap-3 md:flex">
            {['about', 'projects', 'skills', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="nav-chip">{item}</a>
            ))}
          </div>
          <a href="mailto:kayleehenry162@gmail.com" className="pixel-button hidden sm:inline-flex">contact</a>
        </div>
      </nav>

      <section
          id="home"
          className={`relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-16 transition-all duration-500 ${
            heroWindowVisible && !heroWindowMaximized
              ? 'lg:grid-cols-[1.1fr_.9fr]'
              : 'lg:grid-cols-1'
          }`}
        >
        <motion.div
          layout
          className={`hero-copy ${
            heroWindowVisible && !heroWindowMaximized
              ? 'hero-copy-with-window'
              : 'hero-copy-expanded'
          }`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            layout: {
              type: 'spring',
              stiffness: 55,
              damping: 20,
              mass: 1.8,
            },
            opacity: {
              duration: 0.45,
              ease: 'easeOut',
            },
            y: {
              duration: 0.7,
              ease: 'easeOut',
            },
          }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border-3 border-ink bg-mint px-4 py-2 font-pixel text-sm shadow-pixel-sm">
            <Sparkles size={16} /> hi there, welcome to my portfolio!
          </p>
          <h1 className="hero-title font-display text-6xl font-black leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            <span>frontend dev,</span>
            <span>full stack dev,</span>
            <span>and design.</span>
          </h1>
          <p className="hero-description mt-6 text-lg leading-8 text-ink/75">
            i’m kaylee henry, a computer science student at Georgia Tech building interactive web apps, dashboards, and game-inspired experiences with a variety of different langauges and frameworks, as well as a strong visual design!
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="pixel-button bg-blue">view projects <ArrowUpRight size={18} /></a>
            <a href="https://github.com/kaylee162" target="_blank" rel="noreferrer" className="pixel-button bg-pink"><Github size={18} /> github</a>
          </div>
        </motion.div>

        {heroRestoreVisible && (
          <button
            type="button"
            className={`restore-window-button hero-restore-button ${
              skillsRestoreVisible ? 'restore-button-stacked' : ''
            }`}
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
              layout: {
                type: 'spring',
                stiffness: 60,
                damping: 18,
                mass: 1.6,
              },
              opacity: {
                duration: 0.35,
                ease: 'easeOut',
              },
              scale: {
                duration: 0.5,
                ease: 'easeOut',
              },
              rotate: {
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            <WindowFrame
              label="DEVELOPER"
              accent="bg-coral"
              url={heroCardUrls[activeHeroCard]}
              interactive
              isMaximized={heroWindowMaximized}
              onClose={() => setHeroWindowMode('closed')}
              onMinimize={() => {
                if (heroWindowMaximized) {
                  setHeroWindowMode('open')
                } else {
                  setHeroWindowMode('minimized')
                }
              }}
              onMaximize={() => {
                if (!heroWindowMaximized) {
                  setHeroWindowMode('maximized')
                }
              }}
              onRefresh={() => {
                setActiveHeroCard((currentCard) => {
                  const currentIndex = heroCards.indexOf(currentCard)
                  const nextIndex = (currentIndex + 1) % heroCards.length

                  return heroCards[nextIndex]
                })
                setHeroWindowMode('maximized')
              }}
            >
              {activeHeroCard === 'flappy-duck' ? (
                <FlappyDuckGame />
              ) : activeHeroCard === 'oceanscape' ? (
                <OceanScapeGame />
              ) : (
                <div className="member-card">
                  <div className="photo-card">
                    <div className="name-plate">KAYLEE HENRY</div>
                    <img src={profilePic} alt="Kaylee Henry" />
                    <MousePointer2 className="pointer-icon" fill="white" />
                  </div>

                  <div className="member-info">
                    <div className="heart-row">♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡</div>
                    <p><span>NAME</span> KAYLEE HENRY</p>
                    <p><span>ROLE</span> FRONT-END DEV</p>
                    <p><span>FOCUS</span> UI/UX + WEB APPS</p>

                    <div className="mini-panel">
                      <p>STATUS</p>
                      <strong>ALWAYS DESIGNING</strong>
                      <p>LOCATION</p>
                      <strong>ATLANTA, GA</strong>
                    </div>
                  </div>

                  {heroWindowMaximized && (
                    <div className="member-extra">
                      <div>
                        <p className="extra-kicker">currently building</p>
                        <h3>interactive worlds</h3>
                        <p>
                          i like turning normal sites and apps into playful, game-inspired
                          interfaces with motion, personality, and little surprises :P
                        </p>
                      </div>

                      <div className="extra-list">
                        <p><span>01</span> playful interfaces</p>
                        <p><span>02</span> interactive experiences</p>
                        <p><span>03</span> enjoyable interactions</p>
                      </div>

                      <div className="game-hint">
                        <strong>mini game unlocked!</strong>
                        <p>Click refresh ↻ to explore a mini ocean scene.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </WindowFrame>
          </motion.div>
        )}
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <div className="pixel-panel bg-lavender">
            <p className="section-kicker">welcome</p>
            <h2 className="section-title">hi, i’m kaylee!</h2>
            <p className="mt-4 leading-7 text-ink/75">
              i’m a computer science student at Georgia Tech who loves building web apps, playful interfaces, and interactive digital experiences. this portfolio is a mix of my projects, design style, technical skills, and the creative details i bring into my work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Frontend Dev', 'React, Node.js, Next.js, JavaScript', 'Building polished interfaces with reusable components, always with UI / UX and design in mind'],
              ['Full-Stack Dev', 'Flask, Django, Python', 'Creating data-driven apps with auth, dashboards, and APIs. Experienced with SQL, PostgreSQL, and MongoDB databases'],
              ['Game Development', 'GBA, C, C++, C#, Java', 'Designing sprites, tilemaps, collision, and interactive worlds. Currently building a GBA platformer with a unique growth mechanic!'],
            ].map(([stat, label, detail]) => (
              <div key={label} className="stat-card">
                <Trophy className="stat-icon" />
                <strong>{stat}</strong>
                <span>{label}</span>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">project select</p>
            <h2 className="section-title">featured projects</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`filter-chip ${activeCategory === category ? 'is-active' : ''}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article layout key={project.title} className="project-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <div className="project-screen">
                <div className="screen-header"><span></span><span></span><span></span></div>
                <Code2 size={42} />
              </div>
              <div className="p-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">{project.type}</p>
                <h3 className="mt-2 font-display text-3xl font-black">{project.title}</h3>
                <p className="mt-3 leading-7 text-ink/75">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold hover:underline">
                  open project <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-5 py-16">
        {skillsRestoreVisible && (
          <button
            type="button"
            className="restore-window-button skills-restore-button"
            onClick={() => {
              scrollToSection('skills')
              setSkillsWindowMode('open')
            }}
          >
            open skills window
          </button>
        )}

        {skillsWindowVisible && (
          <motion.div
            layout
            className={skillsWindowMaximized ? 'skills-window-maximized' : ''}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              layout: {
                type: 'spring',
                stiffness: 60,
                damping: 18,
                mass: 1.6,
              },
              opacity: { duration: 0.35 },
              scale: { duration: 0.5 },
            }}
          >
            <WindowFrame
              label="SKILLS"
              accent="bg-lavender"
              interactive
              isMaximized={skillsWindowMaximized}
              onClose={() => setSkillsWindowMode('closed')}
              onMinimize={() => {
                if (skillsWindowMaximized) {
                  setSkillsWindowMode('open')
                } else {
                  setSkillsWindowMode('minimized')
                }
              }}
              onMaximize={() => {
                if (!skillsWindowMaximized) {
                  setSkillsWindowMode('maximized')
                }
              }}
              onRefresh={() => {
                setSkillsWindowMode('maximized')
              }}
            >
              <div className="skills-grid">
                <div>
                  <p className="section-kicker">toolbox</p>
                  <h2 className="section-title">design-minded engineering.</h2>
                  <p className="mt-4 leading-7 text-ink/75">
                    i like building interfaces that feel intentional and have clear navigation, responsive layouts, meaningful motion, and code that is easy to maintain
                  </p>
                </div>

                <div className="skill-cloud">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -6, rotate: index % 2 ? 2 : -2 }}
                      className="skill-badge"
                    >
                      <Star size={14} fill="currentColor" /> {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        )}
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-16 pb-24">
        <div className="contact-panel">
          <div>
            <p className="section-kicker">next level?</p>
            <h2 className="section-title">let’s build something memorable.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-ink/75">
              I’m interested in front-end, UI/UX, web development, and game-adjacent interactive experiences.
            </p>
          </div>
          <div className="contact-links">
            <a href="mailto:kayleehenry162@gmail.com"><Mail /> kayleehenry162@gmail.com</a>
            <a href="https://github.com/kaylee162" target="_blank" rel="noreferrer"><Github /> github.com/kaylee162</a>
            <a href="https://www.linkedin.com/in/kaylee-henry-769357313/" target="_blank" rel="noreferrer"><Linkedin /> linkedin</a>
            <span><MapPin /> Atlanta, GA</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
