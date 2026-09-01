import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext.jsx'

const STEPS = [
  {
    icon: 'briefcase',
    title: 'Welcome to JobTracker',
    description:
      'Track every job application in one place — from the first application to the final offer.',
  },
  {
    icon: 'grid',
    title: 'See the big picture',
    description:
      'Your dashboard keeps tabs on totals, interviews, offers, and rejections at a glance.',
  },
  {
    icon: 'plus',
    title: 'Let’s get started',
    description:
      'Add your first application to begin tracking. You can edit, search, filter, and analyze everything as you go.',
  },
]

export default function OnboardingModal() {
  const { showOnboarding, dismissOnboarding } = useOnboarding()
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (!showOnboarding) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') dismissOnboarding()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showOnboarding, dismissOnboarding])

  if (!showOnboarding) return null

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function handlePrimary() {
    if (isLast) {
      dismissOnboarding()
      navigate('/add')
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="modal-overlay onboarding-overlay" role="presentation">
      <div
        className="modal onboarding"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <div className="onboarding__dots">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`onboarding__dot${i === step ? ' onboarding__dot--active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding__icon" aria-hidden="true">
          <svg className="onboarding__icon-svg">
            <use href={`/icons.svg#${current.icon}-icon`}></use>
          </svg>
        </div>

        <h2 id="onboarding-title" className="onboarding__title">
          {current.title}
        </h2>
        <p className="onboarding__description">{current.description}</p>

        <div className="onboarding__actions">
          <button
            type="button"
            className="btn btn--ghost onboarding__skip"
            onClick={dismissOnboarding}
          >
            Skip
          </button>
          <button type="button" className="btn btn--primary" onClick={handlePrimary}>
            {isLast ? 'Add my first application' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}