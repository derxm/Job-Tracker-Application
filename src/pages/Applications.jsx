import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import ApplicationCard from '../components/ApplicationCard.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Applications() {
  const { applications } = useApplications()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = useMemo(() => {
    let list = [...applications]

    if (statusFilter !== 'all') {
      list = list.filter((app) => app.status === statusFilter)
    }

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.jobTitle.toLowerCase().includes(q) ||
          (app.location && app.location.toLowerCase().includes(q)),
      )
    }

    switch (sortBy) {
      case 'oldest':
        list.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate))
        break
      case 'company':
        list.sort((a, b) => a.company.localeCompare(b.company))
        break
      case 'status': {
        const order = { applied: 0, interview: 1, offer: 2, rejected: 3 }
        list.sort((a, b) => (order[a.status] ?? 0) - (order[b.status] ?? 0))
        break
      }
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        break
    }

    return list
  }, [applications, search, statusFilter, sortBy])

  return (
    <div className="applications-page">
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {applications.length === 0 ? (
        <EmptyState
          icon="briefcase"
          title="No applications yet"
          message="Add your first job application to start tracking."
          actionLabel="Add application"
          onAction={() => navigate('/add')}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No matches"
          message="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="card-grid">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  )
}