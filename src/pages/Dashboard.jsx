import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import StatsCard from '../components/StatsCard.jsx'
import ApplicationCard from '../components/ApplicationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { STATUS_COLORS } from '../utils/constants.js'

function daysSince(dateString) {
  const then = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - then.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

export default function Dashboard() {
  const { applications } = useApplications()
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const base = { total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 }
    return applications.reduce((acc, app) => {
      acc.total++
      if (acc[app.status] !== undefined) acc[app.status]++
      return acc
    }, base)
  }, [applications])

  const insights = useMemo(() => {
    const active =
      applications.length - stats.rejected - stats.offer
    const responded = stats.interview + stats.offer
    const responseRate = stats.total
      ? Math.round((responded / stats.total) * 100)
      : 0
    const successRate = stats.total
      ? Math.round((stats.offer / stats.total) * 100)
      : 0

    let lastActivity = null
    if (applications.length) {
      lastActivity = applications.reduce((latest, app) => {
        const d = new Date(app.appliedDate)
        return d > latest ? d : latest
      }, new Date(0))
    }

    return { active, responseRate, successRate, lastActivity }
  }, [applications, stats])

  const recentApps = useMemo(
    () =>
      [...applications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
    [applications],
  )

  return (
    <div className="dashboard">
      <section className="dashboard__stats">
        <StatsCard
          label="Total"
          count={stats.total}
          color="var(--color-primary)"
          icon="grid"
        />
        <StatsCard
          label="Applied"
          count={stats.applied}
          color={STATUS_COLORS.applied}
          icon="send"
        />
        <StatsCard
          label="Interview"
          count={stats.interview}
          color={STATUS_COLORS.interview}
          icon="users"
        />
        <StatsCard
          label="Offer"
          count={stats.offer}
          color={STATUS_COLORS.offer}
          icon="check"
        />
        <StatsCard
          label="Rejected"
          count={stats.rejected}
          color={STATUS_COLORS.rejected}
          icon="x"
        />
      </section>

      {applications.length > 0 && (
        <section className="insights" aria-label="Dashboard insights">
          <div className="insight" title="Applications still in progress (not offered or rejected)">
            <span className="insight__icon" aria-hidden="true">
              📈
            </span>
            <div className="insight__text">
              <span className="insight__value">{insights.active}</span>
              <span className="insight__label">Active pipeline</span>
            </div>
          </div>
          <div className="insight" title="Share of applications that reached an interview or offer">
            <span className="insight__icon" aria-hidden="true">
              ✉️
            </span>
            <div className="insight__text">
              <span className="insight__value">{insights.responseRate}%</span>
              <span className="insight__label">Response rate</span>
            </div>
          </div>
          <div className="insight" title="Share of applications that resulted in an offer">
            <span className="insight__icon" aria-hidden="true">
              🏆
            </span>
            <div className="insight__text">
              <span className="insight__value">{insights.successRate}%</span>
              <span className="insight__label">Success rate</span>
            </div>
          </div>
          <div
            className="insight"
            title="Days since your most recent application"
          >
            <span className="insight__icon" aria-hidden="true">
              🕒
            </span>
            <div className="insight__text">
              <span className="insight__value">
                {insights.lastActivity ? daysSince(insights.lastActivity) : 0}
              </span>
              <span className="insight__label">Days since last</span>
            </div>
          </div>
        </section>
      )}

      <section className="dashboard__recent">
        <h2 className="section-title">Recent Applications</h2>

        {recentApps.length === 0 ? (
          <EmptyState
            icon="briefcase"
            title="No applications yet"
            message="Start tracking your job applications today. You'll see a summary of your pipeline here."
            actionLabel="Add your first application"
            onAction={() => navigate('/add')}
          />
        ) : (
          <>
            <div className="card-grid">
              {recentApps.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
            <button
              type="button"
              className="btn btn--ghost dashboard__view-all"
              onClick={() => navigate('/applications')}
            >
              View all applications →
            </button>
          </>
        )}
      </section>
    </div>
  )
}