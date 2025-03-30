import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

const Dashboard = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { dbService } = useDatabase()
  
  const [transactions, setTransactions] = useState([])
  const [income, setIncome] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener transacciones
        const transactionsData = await dbService.getAll('transactions')
        const userTransactions = transactionsData.filter(t => t.userId === user.id)
        setTransactions(userTransactions.slice(0, 5)) // Mostrar solo las 5 más recientes
        
        // Obtener ingresos
        const incomeData = await dbService.getAll('income')
        const userIncome = incomeData.filter(i => i.userId === user.id)
        setIncome(userIncome)
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [dbService, user])
  
  // Calcular balance total
  const calculateBalance = () => {
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
    const totalExpenses = transactions.reduce((sum, item) => sum + item.amount, 0)
    return totalIncome - totalExpenses
  }
  
  if (loading) {
    return <div className="text-center p-8">{t('common.loading')}</div>
  }
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{t('navigation.home')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Balance Total</h2>
          <p className={`text-3xl font-bold ${calculateBalance() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${calculateBalance().toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Ingresos</h2>
          <p className="text-3xl font-bold text-blue-600">
            ${income.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Gastos</h2>
          <p className="text-3xl font-bold text-red-600">
            ${transactions.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('transactions.title')}</h2>
            <Link to="/transactions" className="text-blue-600 hover:text-blue-800 text-sm">
              Ver todos
            </Link>
          </div>
          
          {transactions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <li key={transaction.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.createDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-medium text-red-600">${transaction.amount.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{t('transactions.noTransactions')}</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('income.title')}</h2>
            <Link to="/income" className="text-blue-600 hover:text-blue-800 text-sm">
              Ver todos
            </Link>
          </div>
          
          {income.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {income.map(item => (
                <li key={item.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.timeLapse}</p>
                      <p className="text-sm text-gray-500">
                        {item.current ? 'Actual' : 'Histórico'}
                      </p>
                    </div>
                    <p className="font-medium text-green-600">${item.amount.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{t('income.noIncome')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard