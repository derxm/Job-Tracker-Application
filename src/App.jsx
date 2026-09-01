import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import OnboardingModal from './components/OnboardingModal.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Applications from './pages/Applications.jsx'
import AddApplication from './pages/AddApplication.jsx'
import EditApplication from './pages/EditApplication.jsx'
import Analytics from './pages/Analytics.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <OnboardingModal />
      <div className="layout">
        <Sidebar />
        <div className="layout__main">
          <Header />
          <main className="layout__content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/add" element={<AddApplication />} />
              <Route path="/edit/:id" element={<EditApplication />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App