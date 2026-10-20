import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './site.css'
import './index.css'
import './dashboard.css'
import './mobile.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
