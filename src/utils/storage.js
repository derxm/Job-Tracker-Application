const STORAGE_KEY = 'job-applications'

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  } catch {
    // storage unavailable (e.g. private mode) - fail silently
  }
}

export function clearApplications() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

const ONBOARDED_KEY = 'job-app-tracker-onboarded'

export function hasOnboarded() {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === 'true'
  } catch {
    return true
  }
}

export function markOnboarded() {
  try {
    localStorage.setItem(ONBOARDED_KEY, 'true')
  } catch {
    // ignore
  }
}