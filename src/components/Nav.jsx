function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-ink bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-3 font-pixel text-xl tracking-wide">
          <span>KAYLEE.EXE</span>
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


        <a href="mailto:kayleehenry162@gmail.com" className="pixel-button hidden sm:inline-flex">contact</a>
      </div>
    </nav>
  )
}

export default Nav
