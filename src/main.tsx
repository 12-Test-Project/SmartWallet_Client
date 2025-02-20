import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@assets/stylesheets/index.css'

import { router } from '@routes/__root'
import { RouterProvider } from '@tanstack/react-router'

const root = document.getElementById('root')
if(!root) throw new Error('@@ root element is required!')
createRoot(root).render(
  <StrictMode>
		<RouterProvider router={router} />
  </StrictMode>,
)
