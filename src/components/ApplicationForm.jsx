import { useState } from 'react'

const DEFAULT_FORM = {
  company: '',
  jobTitle: '',
  status: 'applied',
  appliedDate: new Date().toISOString().split('T')[0],
  location: '',
  salary: '',
  notes: '',
  link: '',
}

export default function ApplicationForm({
  initialData,
  submitLabel = 'Save',
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    ...DEFAULT_FORM,
    ...initialData,
  }))
  const [errors, setErrors] = useState({})

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.company.trim()) nextErrors.company = 'Company is required'
    if (!form.jobTitle.trim()) nextErrors.jobTitle = 'Job title is required'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit({
      ...form,
      company: form.company.trim(),
      jobTitle: form.jobTitle.trim(),
      location: form.location.trim(),
      salary: form.salary.trim(),
      notes: form.notes.trim(),
      link: form.link.trim(),
    })
  }

  return (
    <form className="app-form" onSubmit={handleSubmit} noValidate>
      <div className="app-form__group">
        <label className="app-form__label" htmlFor="company">
          Company *
        </label>
        <input
          id="company"
          className={`app-form__input${errors.company ? ' app-form__input--error' : ''}`}
          type="text"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          placeholder="Google, Amazon, etc."
        />
        {errors.company && (
          <p className="app-form__error">{errors.company}</p>
        )}
      </div>

      <div className="app-form__group">
        <label className="app-form__label" htmlFor="jobTitle">
          Job Title *
        </label>
        <input
          id="jobTitle"
          className={`app-form__input${errors.jobTitle ? ' app-form__input--error' : ''}`}
          type="text"
          value={form.jobTitle}
          onChange={(e) => update('jobTitle', e.target.value)}
          placeholder="Frontend Developer"
        />
        {errors.jobTitle && (
          <p className="app-form__error">{errors.jobTitle}</p>
        )}
      </div>

      <div className="app-form__row">
        <div className="app-form__group app-form__group--half">
          <label className="app-form__label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="app-form__select"
            value={form.status}
            onChange={(e) => update('status', e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="app-form__group app-form__group--half">
          <label className="app-form__label" htmlFor="appliedDate">
            Date Applied
          </label>
          <input
            id="appliedDate"
            className="app-form__input"
            type="date"
            value={form.appliedDate}
            onChange={(e) => update('appliedDate', e.target.value)}
          />
        </div>
      </div>

      <div className="app-form__row">
        <div className="app-form__group app-form__group--half">
          <label className="app-form__label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="app-form__input"
            type="text"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Remote, New York, etc."
          />
        </div>

        <div className="app-form__group app-form__group--half">
          <label className="app-form__label" htmlFor="salary">
            Salary
          </label>
          <input
            id="salary"
            className="app-form__input"
            type="text"
            value={form.salary}
            onChange={(e) => update('salary', e.target.value)}
            placeholder="$80,000"
          />
        </div>
      </div>

      <div className="app-form__group">
        <label className="app-form__label" htmlFor="link">
          Application Link
        </label>
        <input
          id="link"
          className="app-form__input"
          type="url"
          value={form.link}
          onChange={(e) => update('link', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="app-form__group">
        <label className="app-form__label" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          className="app-form__textarea"
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          rows={4}
          placeholder="Any notes about this application..."
        />
      </div>

      <div className="app-form__actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}