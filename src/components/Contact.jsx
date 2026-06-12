import { Github, Linkedin, Mail, MapPin } from 'lucide-react'

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-16 pb-24">
      <div className="contact-panel">
        <div>
          <p className="section-kicker">next level?</p>
          <h2 className="section-title">let’s build something memorable.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-ink/75">
            i’m open to internships, co-ops, and front-end or full-stack opportunities where i can build polished, useful, and visually thoughtful software.
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
  )
}

export default Contact
