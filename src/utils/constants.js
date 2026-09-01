export const STATUSES = ['applied', 'interview', 'offer', 'rejected']

export const STATUS_LABELS = {
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const STATUS_COLORS = {
  applied: 'var(--status-applied)',
  interview: 'var(--status-interview)',
  offer: 'var(--status-offer)',
  rejected: 'var(--status-rejected)',
}

export function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}