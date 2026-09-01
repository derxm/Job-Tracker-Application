import { useLocation } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const TITLES = {
  '/': 'Dashboard',
  '/applications': 'Applications',
  '/add': 'Add Application',
  '/analytics': 'Analytics',
}

export default function Header() {
  const location = useLocation()
  const { applications } = useApplications()
  const { theme, toggleTheme } = useTheme()

  const title =
    TITLES[location.pathname] ??
    (location.pathname.startsWith('/edit')
      ? 'Edit Application'
      : 'Applications')
  const subtitle =
    location.pathname === '/'
      ? `${applications.length} total application${
          applications.length === 1 ? '' : 's'
        }`
      : null

  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">{title}</h1>
        {subtitle && <p className="header__subtitle">{subtitle}</p>}
      </div>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <svg className="theme-toggle__icon" aria-hidden="true">
          <use
            href={
              theme === 'dark' ? '/icons.svg#sun-icon' : '/icons.svg#moon-icon'
            }
          ></use>
        </svg>
      </button>
    </header>
  )
}