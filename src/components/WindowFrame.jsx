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
          <button type="button" aria-label="Close window" onClick={interactive ? onClose : undefined}></button>
          <button type="button" aria-label="Minimize window" onClick={interactive ? onMinimize : undefined}></button>
          <button type="button" aria-label="Maximize window" onClick={interactive ? onMaximize : undefined}></button>
        </div>

        <div className="tab">{label}</div>
        <div className={`search-pill ${accent}`}>CREATIVE AND INTERACTIVE!</div>
      </div>

      <div className="url-bar">
        <button type="button" className="refresh" onClick={interactive ? onRefresh : undefined} aria-label="Refresh card">
          ↻
        </button>

        <span className="url">{url}</span>
      </div>

      {children}
    </div>
  )
}

export default WindowFrame
