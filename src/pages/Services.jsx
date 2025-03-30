import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

const Services = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { dbService } = useDatabase()
  
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchServices()
  }, [dbService])
  
  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await dbService.getAll('services')
      setServices(data)
    } catch (error) {
      console.error('Error al cargar servicios:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <div className="text-center p-8">{t('common.loading')}</div>
  }
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{t('services.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center p-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No hay servicios disponibles</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services