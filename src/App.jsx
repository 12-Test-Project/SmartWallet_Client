import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useDatabase } from './contexts/DatabaseContext'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import OfflineIndicator from './components/OfflineIndicator'

// Lazy loading de componentes
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Transactions = lazy(() => import('./pages/Transactions'))
const TransactionDetail = lazy(() => import('./pages/TransactionDetail'))
const Income = lazy(() => import('./pages/Income'))
const IncomeDetail = lazy(() => import('./pages/IncomeDetail'))
const Services = lazy(() => import('./pages/Services'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  const { t } = useTranslation()
  const { isOnline, pendingSyncCount } = useDatabase()
  
  return (
    <>
      {!isOnline && <OfflineIndicator pendingSyncCount={pendingSyncCount} />}
      
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/:id" element={<TransactionDetail />} />
            <Route path="income" element={<Income />} />
            <Route path="income/:id" element={<IncomeDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App