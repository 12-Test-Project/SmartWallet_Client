import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@assets/stylesheets/index.css'

import App from '@/App.tsx'

const root = document.getElementById('root')
if(!root) throw new Error('@@ root element is required!')
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
