import { useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext.jsx'
import ApplicationForm from '../components/ApplicationForm.jsx'

export default function AddApplication() {
  const { addApplication } = useApplications()
  const navigate = useNavigate()

  function handleSubmit(data) {
    addApplication(data)
    navigate('/applications')
  }

  return (
    <div className="page">
      <ApplicationForm
        submitLabel="Add Application"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}