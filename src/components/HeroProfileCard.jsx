import { Globe2, Sparkles, Star, Briefcase, MapPin } from 'lucide-react'
import profilePic from '../assets/profilepic2.jpg'

function HeroProfileCard({ isMaximized }) {
  return (
    <div className={`member-card badge-card ${isMaximized ? 'badge-card-maximized' : ''}`}>
      <div className="badge-page">
        <div className="badge-profile-page">
          <img src={profilePic} alt="Kaylee Henry" className="badge-photo" />

          <div className="badge-details">
            <div className="badge-name-row">
              <div>
                <h3>KAYLEE HENRY</h3>
              </div>
              <Star className="badge-star" fill="#ffe777" />
            </div>

            <div className="badge-section">
              <p>ROLE</p>
              <strong>Software Engineer</strong>
              <span>UI/UX Designer</span>
            </div>

            <div className="badge-divider" />

            <div className="badge-section badge-location-card">
              <div className="badge-location-copy">
                <p>EMPLOYMENT</p>
                <strong>Bank of America</strong>
                <span>Software Engineer</span>
              </div>

              <Briefcase className="badge-globe" />
            </div>

            <div className="badge-section badge-location-card badge-location-secondary">
              <div className="badge-location-copy">
                <p>LOCATION</p>
                <strong>Atlanta, GA</strong>
              </div>

              <MapPin className="badge-globe" />
            </div>
          </div>
        </div>
      </div>

      {isMaximized && (
        <div className="member-extra badge-extra">
          <div className="badge-extra-heading">
            <Sparkles />
            <h3>career snapshot</h3>
          </div>

          <p>
            experience building software across enterprise, startup, web, mobile,
            and game development environments.
          </p>

          <div className="extra-list compact-extra-list">
            <p><span>NOW</span> Software Engineer • Bank of America</p>
            <p><span>LEAD</span> Scrum Master / Project Lead • Knobull</p>
            <p><span>DATA</span> Data Management Intern • Work Simplr</p>
            <p><span>BUILD</span> iOS, App, Web, and Game Development</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroProfileCard
