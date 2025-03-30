import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

const TransactionDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { dbService } = useDatabase()
  
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    amount: '',
    type: '',
    userId: ''
  })
  
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await dbService.getById('transactions', parseInt(id))
        if (!data) {
          navigate('/transactions')
          return
        }
        
        setTransaction(data)
        setFormData({
          id: data.id,
          amount: data.amount,
          type: data.type,
          userId: data.userId
        })
      } catch (error) {
        console.error('Error al cargar transacción:', error)
        navigate('/transactions')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTransaction()
  }, [id, dbService, navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const updatedTransaction = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      
      await dbService.update('transactions', updatedTransaction)
      navigate('/transactions')
    } catch (error) {
      console.error('Error al actualizar transacción:', error)
    }
  }
  
  if (loading) {
    return <div className="text-center p-8">{t('common.loading')}</div>
  }
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('transactions.edit')}</h1>
        <button
          onClick={() => navigate('/transactions')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {t('common.cancel')}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('transactions.amount')}
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('transactions.type')}
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Información adicional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">ID</p>
            <p className="font-medium">{transaction.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transactions.date')}</p>
            <p className="font-medium">
              {new Date(transaction.createDate).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado de sincronización</p>
            <p className="font-medium">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                transaction.syncStatus === 'synced' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {transaction.syncStatus === 'synced' ? 'Sincronizado' : 'Pendiente'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail