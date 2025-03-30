import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { AuthProvider } from './contexts/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { registerSW } from 'virtual:pwa-register'

// Registrar el service worker para PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('La aplicación está lista para uso offline')
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <DatabaseProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DatabaseProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
)