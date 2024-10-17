import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Example from './navbar.jsx'

import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Example></Example>
    <App />
  </StrictMode>,
)
