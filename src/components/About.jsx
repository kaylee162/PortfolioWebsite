import { Trophy } from 'lucide-react'

const highlights = [
  [
    'Frontend Dev',
    'React, Vite, JavaScript',
    'Building responsive, polished interfaces with reusable components, clear user flows, and thoughtful UI/UX details.',
  ],
  [
    'Full-Stack Dev',
    'Django, Flask, Python',
    'Creating data-driven apps with authentication, dashboards, APIs, SQL, PostgreSQL, and MongoDB databases.',
  ],
  [
    'Interactive Builder',
    'Games, motion, creative UI',
    'Designing sprites, tilemaps, collision systems, playful interactions, and small details that make apps feel memorable.',
  ],
]

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <div className="pixel-panel bg-lavender">
          <p className="section-kicker">welcome</p>
          <h2 className="section-title">hi, i’m kaylee!</h2>
          <p className="mt-4 leading-7 text-ink/75">
            I’m a computer science student at Georgia Tech interested in front-end engineering, full-stack web apps, UI/UX, and interactive product experiences. This portfolio is a mix of my projects, design style, technical skills, and the creative details I bring into my work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map(([stat, label, detail]) => (
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
  )
}

export default About
