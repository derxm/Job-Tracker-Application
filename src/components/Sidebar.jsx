import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: 'grid' },
  { to: '/applications', label: 'Applications', icon: 'list' },
  { to: '/analytics', label: 'Analytics', icon: 'chart' },
  { to: '/add', label: 'Add Application', icon: 'plus' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src={logo} alt="" className="sidebar__logo-img" />
        <span className="sidebar__name">JobTracker</span>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            <svg className="sidebar__icon" aria-hidden="true">
              <use href={`/icons.svg#${icon}-icon`}></use>
            </svg>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">Track smarter, land faster.</div>
    </aside>
  )
}