import { motion } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { categories } from '../data/projects'

function Projects({ activeCategory, setActiveCategory, visibleProjects }) {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">project select</p>
          <h2 className="section-title">featured projects</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink/70">
            A mix of full-stack apps, dashboards, and interactive projects that show how I think through user experience, implementation, and visual polish.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`filter-chip ${activeCategory === category ? 'is-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
            <motion.article
            layout
            key={project.title}
            className="project-card flex flex-col"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            >
            <div className="project-screen">
                <div className="screen-header">
                <span></span>
                <span></span>
                <span></span>
                </div>
                <Code2 size={42} />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                {project.type}
                </p>

                <h3 className="mt-2 font-display text-3xl font-black">
                {project.title}
                </h3>

                <p className="mt-3 leading-7 text-ink/75">
                {project.description}
                </p>

                <div className="project-proof">
                <strong>Why it matters</strong>
                <p>{project.impact}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                    {tag}
                    </span>
                ))}
                </div>

                <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-5 inline-flex items-center gap-2 font-bold hover:underline"
                >
                open project <ArrowUpRight size={17} />
                </a>
            </div>
            </motion.article>
        ))}
        </div>
    </section>
  )
}

export default Projects
