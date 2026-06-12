import { useState } from 'react'
import { Globe2, Sparkles, Star } from 'lucide-react'
import profilePic from '../assets/profilepic2.jpg'
import file1 from '../assets/file1.png'
import file2 from '../assets/file2.png'
import file3 from '../assets/file3.png'

const badgePages = [
  { id: 'profile', label: 'Profile', icon: file1 },
  { id: 'building', label: 'Building', icon: file2 },
  { id: 'skills', label: 'Skills', icon: file3 },
]

function HeroProfileCard({ isMaximized }) {
  const [activePage, setActivePage] = useState('profile')

  return (
    <div
      className={`member-card badge-card ${
        isMaximized ? 'badge-card-maximized' : ''
      } ${activePage !== 'profile' ? 'badge-card-wide-page' : ''}`}
    >
      <div className="badge-folders" aria-label="Badge pages">
        {badgePages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`badge-folder ${activePage === page.id ? 'is-active' : ''}`}
            onClick={() => setActivePage(page.id)}
            aria-label={`Open ${page.label} badge page`}
          >
            <img src={page.icon} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="badge-page">
        {activePage === 'profile' && (
          <div className="badge-profile-page">
            <img src={profilePic} alt="Kaylee Henry" className="badge-photo" />

            <div className="badge-details">
              <div className="badge-name-row">
                <h3>KAYLEE HENRY</h3>
                <Star className="badge-star" fill="#ffe777" />
              </div>

              <div className="badge-section">
                <p>ROLE:</p>
                <strong>Full Stack Developer</strong>
                <span>& UI/UX Enthusiast</span>
              </div>

              <div className="badge-divider" />

              <div className="badge-section badge-location">
                <div>
                  <p>LOCATION:</p>
                  <strong>Atlanta, GA</strong>
                </div>
                <Globe2 className="badge-globe" />
              </div>
            </div>
          </div>
        )}

        {activePage === 'building' && (
          <div className="badge-text-page">
            <div className="badge-page-heading">
              <Sparkles />
              <h3>CURRENTLY BUILDING</h3>
            </div>

            <p>
              Interactive web apps that feel playful, polished, and easy to use.
            </p>

            <div className="badge-list">
              <span>Mini games</span>
              <span>Responsive interfaces</span>
              <span>Full-stack projects</span>
            </div>
          </div>
        )}

        {activePage === 'skills' && (
          <div className="badge-text-page">
            <div className="badge-page-heading">
              <Sparkles />
              <h3>TOOLKIT</h3>
            </div>

            <p>
              I like combining clean frontend design with practical backend logic.
            </p>

            <div className="badge-list">
              <span>React + Vite</span>
              <span>Django + Python</span>
              <span>JavaScript</span>
              <span>UI/UX</span>
            </div>
          </div>
        )}
      </div>

      {isMaximized && activePage === 'profile' && (
        <div className="member-extra badge-extra">
          <h3>interactive worlds</h3>
          <p>
            I like turning normal websites and apps into playful, game-inspired
            interfaces with clear user flows, responsive layouts, and little details
            that make people want to click around.
          </p>

          <div className="extra-list">
            <p><span>01</span> playful interfaces</p>
            <p><span>02</span> full-stack web apps</p>
            <p><span>03</span> polished user experiences</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroProfileCard