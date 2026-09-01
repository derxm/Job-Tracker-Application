import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STATUS_LABELS } from '../utils/constants.js'
import { useApplications } from '../context/ApplicationContext.jsx'
import ConfirmModal from './ConfirmModal.jsx'

export default function ApplicationCard({ application }) {
  const { deleteApplication } = useApplications()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { id, company, jobTitle, status, appliedDate, location, salary, notes } =
    application
  const statusLabel = STATUS_LABELS[status] ?? status
  const formattedDate = new Date(appliedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const initials = company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  function handleDelete() {
    deleteApplication(id)
    setConfirmOpen(false)
  }

  return (
    <>
      <article className={`app-card app-card--${status}`}>
        <header className="app-card__header">
          <div className="app-card__from">
            <div
              className={`app-card__avatar app-card__avatar--${status}`}
              aria-hidden="true"
            >
              {initials || '?'}
            </div>
            <div className="app-card__headings">
              <h3 className="app-card__company">{company}</h3>
              <p className="app-card__title">{jobTitle}</p>
            </div>
          </div>
          <span className={`app-card__status app-card__status--${status}`}>
            {statusLabel}
          </span>
        </header>

        <div className="app-card__meta">
          {location && (
            <span className="app-card__meta-item app-card__location">
              <svg className="app-card__meta-icon" aria-hidden="true">
                <use href="/icons.svg#location-icon"></use>
              </svg>
              {location}
            </span>
          )}
          {salary && (
            <span className="app-card__meta-item app-card__salary">
              <svg className="app-card__meta-icon" aria-hidden="true">
                <use href="/icons.svg#money-icon"></use>
              </svg>
              {salary}
            </span>
          )}
          <span className="app-card__meta-item app-card__date">
            <svg className="app-card__meta-icon" aria-hidden="true">
              <use href="/icons.svg#calendar-icon"></use>
            </svg>
            {formattedDate}
          </span>
        </div>

        {notes && (
          <p className="app-card__notes" title={notes}>
            {notes.length > 80 ? `${notes.slice(0, 80)}…` : notes}
          </p>
        )}

        <div className="app-card__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn--danger-ghost"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </button>
        </div>
      </article>

      <ConfirmModal
        open={confirmOpen}
        title="Delete application?"
        message={`Are you sure you want to delete the ${jobTitle} application at ${company}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}