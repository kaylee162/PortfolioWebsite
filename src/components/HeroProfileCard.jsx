import { MousePointer2 } from 'lucide-react'
import profilePic from '../assets/profilepic2.jpg'

function HeroProfileCard({ isMaximized }) {
  return (
    <div className="member-card">
      <div className="photo-card">
        <div className="name-plate">KAYLEE HENRY</div>
        <img src={profilePic} alt="Kaylee Henry" />
        <MousePointer2 className="pointer-icon" fill="white" />
      </div>

      <div className="member-info">
        <div className="heart-row">♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡</div>
        <p><span>NAME</span> KAYLEE HENRY</p>
        <p><span>ROLE</span> FULL-STACK DEV</p>
        <p><span>FOCUS</span> UI/UX + WEB APPS</p>

        <div className="mini-panel">
          <p>STATUS</p>
          <strong>BUILDING</strong>
          <p>LOCATION</p>
          <strong>ATLANTA, GA</strong>
        </div>
      </div>

      {isMaximized && (
        <div className="member-extra">
          <div>
            <p className="extra-kicker">currently building</p>
            <h3>interactive worlds</h3>
            <p>
              I like turning normal websites and apps into playful, game-inspired interfaces with clear user flows, responsive layouts, and little details that make people want to click around.
            </p>
          </div>

          <div className="extra-list">
            <p><span>01</span> playful interfaces</p>
            <p><span>02</span> full-stack web apps</p>
            <p><span>03</span> polished user experiences</p>
          </div>

          <div className="game-hint">
            <strong>mini game unlocked!</strong>
            <p>Click refresh ↻ to explore different games.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroProfileCard
