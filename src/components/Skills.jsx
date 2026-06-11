import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import WindowFrame from './WindowFrame'
import { skills } from '../data/skills'

function Skills({ skillsWindowMode, setSkillsWindowMode, scrollToSection }) {
  const skillsWindowVisible = skillsWindowMode === 'open' || skillsWindowMode === 'maximized'
  const skillsWindowMaximized = skillsWindowMode === 'maximized'
  const skillsRestoreVisible = skillsWindowMode === 'minimized'

  return (
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
            layout: { type: 'spring', stiffness: 60, damping: 18, mass: 1.6 },
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
            onMinimize={() => setSkillsWindowMode(skillsWindowMaximized ? 'open' : 'minimized')}
            onMaximize={() => {
              if (!skillsWindowMaximized) setSkillsWindowMode('maximized')
            }}
            onRefresh={() => setSkillsWindowMode('maximized')}
          >
            <div className="skills-grid">
              <div>
                <p className="section-kicker">toolbox</p>
                <h2 className="section-title">design-minded engineering.</h2>
                <p className="mt-4 leading-7 text-ink/75">
                  I like building interfaces that feel intentional, with clear navigation, responsive layouts, meaningful motion, and code that is easy to maintain.
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
  )
}

export default Skills
