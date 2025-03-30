import React, { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from '../db'

const DatabaseContext = createContext()

export const DatabaseProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingSyncCount, setPendingSyncCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  // Monitorear el estado de la conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      syncData()
    }
    
    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Verificar pendientes al inicio
    checkPendingSync()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Verificar operaciones pendientes de sincronización
  const checkPendingSync = async () => {
    try {
      const queue = await dbService.getSyncQueue()
      const pendingItems = queue.filter(item => item.status === 'pending')
      setPendingSyncCount(pendingItems.length)
      
      // Si estamos online y hay pendientes, intentar sincronizar
      if (navigator.onLine && pendingItems.length > 0) {
        syncData()
      }
    } catch (error) {
      console.error('Error al verificar operaciones pendientes:', error)
    }
  }

  // Sincronizar datos con el servidor
  const syncData = async () => {
    if (isSyncing || !navigator.onLine) return
    
    try {
      setIsSyncing(true)
      const queue = await dbService.getSyncQueue()
      const pendingItems = queue.filter(item => item.status === 'pending')
      
      if (pendingItems.length === 0) {
        setIsSyncing(false)
        return
      }
      
      // Obtener el token de autenticación
      const user = await dbService.getUser()
      if (!user || !user.jwToken) {
        setIsSyncing(false)
        return
      }
      
      // Procesar cada operación pendiente
      for (const item of pendingItems) {
        try {
          await processQueueItem(item, user.jwToken)
          await dbService.updateSyncQueueItem(item.id, { status: 'completed' })
        } catch (error) {
          console.error(`Error al sincronizar item ${item.id}:`, error)
          await dbService.updateSyncQueueItem(item.id, { 
            status: 'error', 
            error: error.message || 'Error desconocido' 
          })
        }
      }
      
      // Actualizar contador de pendientes
      await checkPendingSync()
    } catch (error) {
      console.error('Error durante la sincronización:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  // Procesar un item de la cola de sincronización
  const processQueueItem = async (item, token) => {
    const { operation, storeName, data } = item
    const apiVersion = 'v1' // Versión de la API
    
    // Mapeo de nombres de store a endpoints de API
    const endpointMap = {
      transactions: 'Transaction',
      income: 'Income',
      services: 'Service',
      typeAdvice: 'TypeAdvice',
      adviceQuery: 'AdviceQuery',
      newsSubscription: 'NewsSubscription',
      tasks: 'TaskApp'
    }
    
    const endpoint = endpointMap[storeName]
    if (!endpoint) {
      throw new Error(`No se encontró un endpoint para el store: ${storeName}`)
    }
    
    const baseUrl = `http://localhost:5800/api/${apiVersion}/${endpoint}`
    
    switch (operation) {
      case 'add': {
        // Eliminar propiedades locales antes de enviar
        const { syncStatus, localCreatedAt, localUpdatedAt, ...cleanData } = data
        
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(cleanData)
        })
        
        if (!response.ok) {
          throw new Error(`Error al crear: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Actualizar el item local con el ID del servidor
        if (result.data && result.data.id) {
          const updatedItem = {
            ...data,
            id: result.data.id,
            syncStatus: 'synced',
            createDate: result.data.createDate,
            lastUpdatedDate: result.data.lastUpdatedDate
          }
          await dbService.update(storeName, updatedItem)
        }
        
        break
      }
      
      case 'update': {
        // Eliminar propiedades locales antes de enviar
        const { syncStatus, localCreatedAt, localUpdatedAt, ...cleanData } = data
        
        const response = await fetch(`${baseUrl}/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(cleanData)
        })
        
        if (!response.ok) {
          throw new Error(`Error al actualizar: ${response.status}`)
        }
        
        // Actualizar el estado de sincronización
        const updatedItem = {
          ...data,
          syncStatus: 'synced'
        }
        await dbService.update(storeName, updatedItem)
        
        break
      }
      
      case 'delete': {
        const response = await fetch(`${baseUrl}/${data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) {
          throw new Error(`Error al eliminar: ${response.status}`)
        }
        
        break
      }
      
      default:
        throw new Error(`Operación no soportada: ${operation}`)
    }
  }

  // Forzar sincronización manual
  const forceSyncData = () => {
    if (navigator.onLine && !isSyncing) {
      syncData()
    }
  }

  return (
    <DatabaseContext.Provider value={{
      dbService,
      isOnline,
      pendingSyncCount,
      isSyncing,
      syncData: forceSyncData,
      checkPendingSync
    }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = () => useContext(DatabaseContext)