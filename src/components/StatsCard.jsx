export default function StatsCard({ label, count, color, icon }) {
  return (
    <article className="stats-card" style={{ '--stat-color': color }}>
      <div className="stats-card__icon" aria-hidden="true">
        <svg className="stats-card__icon-svg">
          <use href={`/icons.svg#${icon}-icon`}></use>
        </svg>
      </div>
      <div className="stats-card__content">
        <span className="stats-card__count">{count}</span>
        <span className="stats-card__label">{label}</span>
      </div>
    </article>
  )
}