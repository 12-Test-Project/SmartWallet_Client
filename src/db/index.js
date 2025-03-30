import { openDB } from 'idb'

const DB_NAME = 'smartWalletDB'
const DB_VERSION = 1

// Definición de stores
const STORES = {
  transactions: 'transactions',
  income: 'income',
  services: 'services',
  typeAdvice: 'typeAdvice',
  adviceQuery: 'adviceQuery',
  newsSubscription: 'newsSubscription',
  tasks: 'tasks',
  syncQueue: 'syncQueue', // Para almacenar operaciones pendientes de sincronización
  user: 'user' // Para almacenar información del usuario
}

// Inicializar la base de datos
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Crear stores si no existen
      if (!db.objectStoreNames.contains(STORES.transactions)) {
        const transactionsStore = db.createObjectStore(STORES.transactions, { keyPath: 'id', autoIncrement: true })
        transactionsStore.createIndex('userId', 'userId', { unique: false })
        transactionsStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.income)) {
        const incomeStore = db.createObjectStore(STORES.income, { keyPath: 'id', autoIncrement: true })
        incomeStore.createIndex('userId', 'userId', { unique: false })
        incomeStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.services)) {
        const servicesStore = db.createObjectStore(STORES.services, { keyPath: 'id', autoIncrement: true })
        servicesStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.typeAdvice)) {
        const typeAdviceStore = db.createObjectStore(STORES.typeAdvice, { keyPath: 'id', autoIncrement: true })
        typeAdviceStore.createIndex('serviceId', 'serviceId', { unique: false })
        typeAdviceStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.adviceQuery)) {
        const adviceQueryStore = db.createObjectStore(STORES.adviceQuery, { keyPath: 'id', autoIncrement: true })
        adviceQueryStore.createIndex('userId', 'userId', { unique: false })
        adviceQueryStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.newsSubscription)) {
        const newsSubscriptionStore = db.createObjectStore(STORES.newsSubscription, { keyPath: 'id', autoIncrement: true })
        newsSubscriptionStore.createIndex('userId', 'userId', { unique: false })
        newsSubscriptionStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.tasks)) {
        const tasksStore = db.createObjectStore(STORES.tasks, { keyPath: 'id', autoIncrement: true })
        tasksStore.createIndex('userId', 'userId', { unique: false })
        tasksStore.createIndex('syncStatus', 'syncStatus', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.syncQueue)) {
        db.createObjectStore(STORES.syncQueue, { keyPath: 'id', autoIncrement: true })
      }

      if (!db.objectStoreNames.contains(STORES.user)) {
        db.createObjectStore(STORES.user, { keyPath: 'id' })
      }
    }
  })

  return db
}

// Clase para manejar operaciones de la base de datos
export class DBService {
  constructor() {
    this.dbPromise = initDB()
  }

  // Métodos genéricos CRUD
  async getAll(storeName) {
    const db = await this.dbPromise
    return db.getAll(storeName)
  }

  async getById(storeName, id) {
    const db = await this.dbPromise
    return db.get(storeName, id)
  }

  async add(storeName, item) {
    const db = await this.dbPromise
    // Agregar estado de sincronización
    const itemWithSync = { ...item, syncStatus: 'pending', localCreatedAt: new Date().toISOString() }
    const id = await db.add(storeName, itemWithSync)
    
    // Agregar a la cola de sincronización
    await this.addToSyncQueue({
      operation: 'add',
      storeName,
      itemId: id,
      data: itemWithSync
    })
    
    return id
  }

  async update(storeName, item) {
    const db = await this.dbPromise
    // Actualizar estado de sincronización
    const itemWithSync = { ...item, syncStatus: 'pending', localUpdatedAt: new Date().toISOString() }
    await db.put(storeName, itemWithSync)
    
    // Agregar a la cola de sincronización
    await this.addToSyncQueue({
      operation: 'update',
      storeName,
      itemId: item.id,
      data: itemWithSync
    })
    
    return item.id
  }

  async delete(storeName, id) {
    const db = await this.dbPromise
    // Obtener el item antes de eliminarlo
    const item = await this.getById(storeName, id)
    
    // Agregar a la cola de sincronización
    await this.addToSyncQueue({
      operation: 'delete',
      storeName,
      itemId: id,
      data: item
    })
    
    await db.delete(storeName, id)
    return id
  }

  // Métodos para la cola de sincronización
  async addToSyncQueue(operation) {
    const db = await this.dbPromise
    return db.add(STORES.syncQueue, {
      ...operation,
      timestamp: new Date().toISOString(),
      status: 'pending'
    })
  }

  async getSyncQueue() {
    const db = await this.dbPromise
    return db.getAll(STORES.syncQueue)
  }

  async updateSyncQueueItem(id, updates) {
    const db = await this.dbPromise
    const item = await db.get(STORES.syncQueue, id)
    const updatedItem = { ...item, ...updates }
    return db.put(STORES.syncQueue, updatedItem)
  }

  async deleteSyncQueueItem(id) {
    const db = await this.dbPromise
    return db.delete(STORES.syncQueue, id)
  }

  // Métodos para el usuario
  async saveUser(user) {
    const db = await this.dbPromise
    return db.put(STORES.user, user)
  }

  async getUser() {
    const db = await this.dbPromise
    // Asumimos que solo hay un usuario
    const allUsers = await db.getAll(STORES.user)
    return allUsers.length > 0 ? allUsers[0] : null
  }

  async clearUser() {
    const db = await this.dbPromise
    const allUsers = await db.getAll(STORES.user)
    for (const user of allUsers) {
      await db.delete(STORES.user, user.id)
    }
  }
}

export const dbService = new DBService()
export default dbService