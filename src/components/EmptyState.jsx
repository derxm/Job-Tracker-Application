export default function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          <svg className="empty-state__icon-svg">
            <use href={`/icons.svg#${icon}-icon`}></use>
          </svg>
        </div>
      )}
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}