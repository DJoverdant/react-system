import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './front/styles/main.css'
import App from './front/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
