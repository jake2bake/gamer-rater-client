import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ApplicationViews } from './components/ApplicationViews'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationViews />
  </StrictMode>,
)
