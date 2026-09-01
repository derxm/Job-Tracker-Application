import { createContext, useContext, useEffect, useState } from 'react'
import { createId } from '../utils/constants.js'
import { loadApplications, saveApplications } from '../utils/storage.js'

const ApplicationContext = createContext(null)

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(loadApplications)

  useEffect(() => {
    saveApplications(applications)
  }, [applications])

  function addApplication(data) {
    const application = {
      id: createId(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    setApplications((prev) => [application, ...prev])
    return application
  }

  function updateApplication(id, data) {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...data } : app)),
    )
  }

  function deleteApplication(id) {
    setApplications((prev) => prev.filter((app) => app.id !== id))
  }

  function getApplication(id) {
    return applications.find((app) => app.id === id)
  }

  const value = {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplication,
  }

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useApplications() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider')
  }
  return context
}