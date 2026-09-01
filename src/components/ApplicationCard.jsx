import { useNavigate } from 'react-router-dom'
import { STATUS_LABELS } from '../utils/constants.js'
import { useApplications } from '../context/ApplicationContext.jsx'

export default function ApplicationCard({ application }) {
  const { deleteApplication } = useApplications()
  const navigate = useNavigate()

  const { id, company, jobTitle, status, appliedDate, location, salary } =
    application
  const statusLabel = STATUS_LABELS[status] ?? status
  const formattedDate = new Date(appliedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  function handleDelete() {
    deleteApplication(id)
  }

  return (
    <article className={`app-card app-card--${status}`}>
      <header className="app-card__header">
        <h3 className="app-card__company">{company}</h3>
        <span className={`app-card__status app-card__status--${status}`}>
          {statusLabel}
        </span>
      </header>

      <p className="app-card__title">{jobTitle}</p>

      <div className="app-card__meta">
        {location && <span className="app-card__location">{location}</span>}
        {salary && <span className="app-card__salary">{salary}</span>}
        <span className="app-card__date">Applied {formattedDate}</span>
      </div>

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
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  )
}