import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { WorkoutsContextProvider } from './context/WorkoutsContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
