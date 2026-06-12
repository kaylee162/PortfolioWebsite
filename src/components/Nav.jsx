import { useState, useEffect } from 'react'

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 border-b-4 border-ink bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_0_#242033]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        {/* Logo with blinking pixel cursor */}
        <a href="#home" className="flex items-center gap-1 font-pixel text-xl tracking-wide group">
          <span className="transition-colors group-hover:text-coral">KAYLEE.EXE</span>
          <span className="nav-logo-cursor select-none">▮</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} className="nav-chip">
              {item}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-chip"
          >
            resume
          </a>
        </div>

        <a href="mailto:kayleehenry162@gmail.com" className="pixel-button hidden sm:inline-flex">
          contact
        </a>
      </div>
    </nav>
  )
}

export default Nav