import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

const IncomeDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { dbService } = useDatabase()
  
  const [income, setIncome] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    amount: '',
    timeLapse: '',
    current: true,
    userId: ''
  })
  
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const data = await dbService.getById('income', parseInt(id))
        if (!data) {
          navigate('/income')
          return
        }
        
        setIncome(data)
        setFormData({
          id: data.id,
          amount: data.amount,
          timeLapse: data.timeLapse,
          current: data.current,
          userId: data.userId
        })
      } catch (error) {
        console.error('Error al cargar ingreso:', error)
        navigate('/income')
      } finally {
        setLoading(false)
      }
    }
    
    fetchIncome()
  }, [id, dbService, navigate])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const updatedIncome = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      
      await dbService.update('income', updatedIncome)
      navigate('/income')
    } catch (error) {
      console.error('Error al actualizar ingreso:', error)
    }
  }
  
  if (loading) {
    return <div className="text-center p-8">{t('common.loading')}</div>
  }
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('income.edit')}</h1>
        <button
          onClick={() => navigate('/income')}
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
                {t('income.amount')}
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
                {t('income.timeLapse')}
              </label>
              <input
                type="text"
                name="timeLapse"
                value={formData.timeLapse}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-900">
                {t('income.current')}
              </label>
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
            <p className="font-medium">{income.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de creación</p>
            <p className="font-medium">
              {new Date(income.createDate).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado de sincronización</p>
            <p className="font-medium">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                income.syncStatus === 'synced' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {income.syncStatus === 'synced' ? 'Sincronizado' : 'Pendiente'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeDetail