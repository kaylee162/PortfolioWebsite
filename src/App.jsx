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
import profilePic from './assets/profilepic.jpg'
import './App.css'

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
  'Tailwind',
  'JavaScript',
  'Python',
  'Django',
  'Java',
  'C#',
  'C',
  'SQL',
  'HTML/CSS',
  'Git',
  'UI/UX',
  'Game Dev',
]

const categories = ['All', 'React', 'Django', 'Game Dev', 'Java']

function WindowFrame({ children, label = 'MEMBER', accent = 'bg-coral' }) {
  return (
    <div className="window-frame shadow-pixel">
      <div className="browser-top">
        <div className="traffic"><span></span><span></span><span></span></div>
        <div className="tab">{label}</div>
        <div className={`search-pill ${accent}`}>LOOKING FOR IMPACT !!!</div>
      </div>
      <div className="url-bar">
        <span className="refresh">↻</span>
        <span className="url">https://kayleedesigns.dev</span>
        <span className="mailbox">✉</span>
      </div>
      {children}
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')

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
          <a href="#home" className="font-pixel text-xl tracking-wide">KAYLEE.EXE</a>
          <div className="hidden items-center gap-3 md:flex">
            {['about', 'projects', 'skills', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="nav-chip">{item}</a>
            ))}
          </div>
          <a href="mailto:kayleehenry162@gmail.com" className="pixel-button hidden sm:inline-flex">contact</a>
        </div>
      </nav>

      <section id="home" className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border-3 border-ink bg-mint px-4 py-2 font-pixel text-sm shadow-pixel-sm">
            <Sparkles size={16} /> front-end developer + designer
          </p>
          <h1 className="font-display text-6xl font-black leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            playful sites,<br /> clean code,<br /> better UX.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            I’m Kaylee Henry, a Computer Science student at Georgia Tech building interactive web apps, dashboards, and game-inspired experiences with React, Django, JavaScript, Python, and strong visual design.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="pixel-button bg-blue">view projects <ArrowUpRight size={18} /></a>
            <a href="https://github.com/kaylee162" target="_blank" rel="noreferrer" className="pixel-button bg-pink"><Github size={18} /> github</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <WindowFrame label="MEMBER" accent="bg-coral">
            <div className="member-card">
              <div className="photo-card">
                <div className="name-plate">KAYLEE</div>
                <img src={profilePic} alt="Kaylee Henry" />
                <MousePointer2 className="pointer-icon" fill="white" />
              </div>
              <div className="member-info">
                <div className="heart-row">♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡</div>
                <p><span>NAME</span> KAYLEE HENRY</p>
                <p><span>ROLE</span> FRONT-END DEV</p>
                <p><span>FOCUS</span> UI/UX + WEB APPS</p>
                <div className="mini-panel">
                  <p>STATUS</p>
                  <strong>BUILDING</strong>
                  <p>LOCATION</p>
                  <strong>ATLANTA, GA</strong>
                </div>
              </div>
            </div>
          </WindowFrame>
        </motion.div>
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <div className="pixel-panel bg-lavender">
            <p className="section-kicker">welcome</p>
            <h2 className="section-title">not just a resume page</h2>
            <p className="mt-4 leading-7 text-ink/75">
              This redesign leans into the references: pixel UI, browser windows, soft pastel cards, tiny game details, and portfolio-slide polish. The goal is to make hiring managers want to click around while still finding the important information fast.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['25+', 'projects built'],
              ['8+', 'languages + tools'],
              ['400+', 'service hours'],
            ].map(([stat, label]) => (
              <div key={label} className="stat-card">
                <Trophy className="mx-auto mb-2" />
                <strong>{stat}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">project select</p>
            <h2 className="section-title">featured builds</h2>
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
        <WindowFrame label="SKILLS" accent="bg-lavender">
          <div className="skills-grid">
            <div>
              <p className="section-kicker">toolbox</p>
              <h2 className="section-title">design-minded engineering</h2>
              <p className="mt-4 leading-7 text-ink/75">
                I like building interfaces that feel intentional: clear navigation, responsive layouts, meaningful motion, and code that is easy to maintain.
              </p>
            </div>
            <div className="skill-cloud">
              {skills.map((skill, index) => (
                <motion.span key={skill} whileHover={{ y: -6, rotate: index % 2 ? 2 : -2 }} className="skill-badge">
                  <Star size={14} fill="currentColor" /> {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </WindowFrame>
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
