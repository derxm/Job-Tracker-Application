import { useMemo } from 'react'
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useApplications } from '../context/ApplicationContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { STATUS_LABELS } from '../utils/constants.js'

const PIE_COLORS = ['#64748b', '#f59e0b', '#10b981', '#ef4444']

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }) {
  const RADIAN = Math.PI / 180
  const radius = (innerRadius + outerRadius) / 2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#ffffff"
      fontSize={15}
      fontWeight={700}
    >
      {value}
    </text>
  )
}

export default function Analytics() {
  const { applications } = useApplications()

  const statusData = useMemo(() => {
    const counts = { applied: 0, interview: 0, offer: 0, rejected: 0 }
    applications.forEach((app) => {
      if (counts[app.status] !== undefined) counts[app.status]++
    })
    return Object.entries(counts).map(([status, count]) => ({
      name: STATUS_LABELS[status],
      value: count,
    }))
  }, [applications])

  const monthlyData = useMemo(() => {
    const months = {}
    applications.forEach((app) => {
      const d = new Date(app.appliedDate)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      months[key] = (months[key] ?? 0) + 1
    })
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => {
        const [y, m] = month.split('-')
        const label = new Date(Number(y), Number(m) - 1).toLocaleDateString(
          'en-US',
          { month: 'short', year: '2-digit' },
        )
        return { name: label, Applications: count }
      })
  }, [applications])

  if (applications.length === 0) {
    return (
      <EmptyState
        icon="chart"
        title="No data to visualize"
        message="Add some job applications first to see analytics."
      />
    )
  }

  return (
    <div className="analytics">
      <section className="analytics__section">
        <h2 className="section-title">Applications by Status</h2>
        <div className="chart-container chart-container--pie">
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
              >
                {statusData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="pie-legend">
          {statusData.map((entry, idx) => (
            <div key={entry.name} className="pie-legend__item">
              <span
                className="pie-legend__swatch"
                style={{ background: PIE_COLORS[idx] }}
              />
              <span className="pie-legend__label">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics__section">
        <h2 className="section-title">Applications per Month</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis allowDecimals={false} tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="Applications"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}