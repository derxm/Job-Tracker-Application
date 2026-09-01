import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApplicationProvider } from './context/ApplicationContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ApplicationProvider>
        <App />
      </ApplicationProvider>
    </ThemeProvider>
  </StrictMode>,
)