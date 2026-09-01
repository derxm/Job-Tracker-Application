import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import ApplicationForm from '../components/ApplicationForm.jsx'

export default function EditApplication() {
  const { id } = useParams()
  const { getApplication, updateApplication } = useApplications()
  const navigate = useNavigate()

  const application = getApplication(id)

  if (!application) {
    return <Navigate to="/applications" replace />
  }

  function handleSubmit(data) {
    updateApplication(id, data)
    navigate('/applications')
  }

  return (
    <div className="page">
      <ApplicationForm
        initialData={application}
        submitLabel="Update Application"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}