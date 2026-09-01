import { createContext, useContext, useState } from 'react'
import { hasOnboarded, markOnboarded } from '../utils/storage.js'

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [showOnboarding, setShowOnboarding] = useState(() => !hasOnboarded())

  function dismissOnboarding() {
    markOnboarded()
    setShowOnboarding(false)
  }

  return (
    <OnboardingContext.Provider value={{ showOnboarding, dismissOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}