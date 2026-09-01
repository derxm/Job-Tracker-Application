import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import StatsCard from '../components/StatsCard.jsx'
import ApplicationCard from '../components/ApplicationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { STATUS_COLORS } from '../utils/constants.js'

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

      <section className="dashboard__recent">
        <h2 className="section-title">Recent Applications</h2>

        {recentApps.length === 0 ? (
          <EmptyState
            icon="briefcase"
            title="No applications yet"
            message="Start tracking your job applications today."
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