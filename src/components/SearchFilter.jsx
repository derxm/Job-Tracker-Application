const STATUS_OPTIONS = ['all', 'applied', 'interview', 'offer', 'rejected']

export default function SearchFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="search-filter">
      <input
        type="search"
        className="search-filter__input"
        placeholder="Search by company or job title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search applications"
      />

      <select
        className="search-filter__select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <select
        className="search-filter__select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort applications"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="company">Company A–Z</option>
        <option value="status">Status</option>
      </select>
    </div>
  )
}