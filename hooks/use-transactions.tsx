"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction as apiDeleteTransaction,
} from "@/lib/api"
import { getFromIndexedDB, saveToIndexedDB } from "@/lib/indexed-db"

export function useTransactions() {
  const { user } = useAuth()
  const { isOnline } = useNetworkStatus()
  const { addToSyncQueue } = useOfflineSync()
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        if (isOnline) {
          // Fetch from API if online
          const data = await getTransactions()
          setTransactions(data)

          // Update IndexedDB for offline access
          await saveToIndexedDB("transactions", data)
        } else {
          // Get from IndexedDB if offline
          const offlineData = await getFromIndexedDB("transactions")
          setTransactions(offlineData || [])
        }
      } catch (error) {
        console.error("Error fetching transactions:", error)

        // Fallback to IndexedDB if API fails
        try {
          const offlineData = await getFromIndexedDB("transactions")
          setTransactions(offlineData || [])
        } catch (dbError) {
          console.error("Error fetching from IndexedDB:", dbError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [user, isOnline])

  const createTransactionHandler = async (data: any) => {
    if (!user) throw new Error("User not authenticated")

    try {
      let newTransaction

      if (isOnline) {
        // Create transaction via API if online
        newTransaction = await createTransaction(data)
      } else {
        // Create temporary transaction with local ID if offline
        newTransaction = {
          ...data,
          id: `local_${Date.now()}`,
          createDate: new Date().toISOString(),
          lastUpdatedDate: null,
        }

        // Add to sync queue for later
        addToSyncQueue({
          endpoint: "/api/v1/Transaction",
          method: "POST",
          data,
          entityType: "transaction",
          entityId: newTransaction.id,
        })
      }

      // Update local state
      setTransactions((prev) => [...prev, newTransaction])

      // Update IndexedDB
      const currentTransactions = (await getFromIndexedDB("transactions")) || []
      await saveToIndexedDB("transactions", [...currentTransactions, newTransaction])

      return newTransaction
    } catch (error) {
      console.error("Error creating transaction:", error)
      throw error
    }
  }

  const updateTransactionHandler = async (id: number | string, data: any) => {
    if (!user) throw new Error("User not authenticated")

    try {
      if (isOnline) {
        // Update via API if online
        await updateTransaction(id, data)
      } else {
        // Add to sync queue for later
        addToSyncQueue({
          endpoint: `/api/v1/Transaction/${id}`,
          method: "PUT",
          data,
          entityType: "transaction",
          entityId: id,
        })
      }

      // Update local state
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? { ...transaction, ...data, lastUpdatedDate: new Date().toISOString() } : transaction,
        ),
      )

      // Update IndexedDB
      const currentTransactions = (await getFromIndexedDB("transactions")) || []
      const updatedTransactions = currentTransactions.map((transaction: any) =>
        transaction.id === id ? { ...transaction, ...data, lastUpdatedDate: new Date().toISOString() } : transaction,
      )
      await saveToIndexedDB("transactions", updatedTransactions)

      return data
    } catch (error) {
      console.error("Error updating transaction:", error)
      throw error
    }
  }

  const deleteTransaction = async (id: number | string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      if (isOnline) {
        // Delete via API if online
        await apiDeleteTransaction(id)
      } else {
        // Add to sync queue for later
        addToSyncQueue({
          endpoint: `/api/v1/Transaction/${id}`,
          method: "DELETE",
          data: null,
          entityType: "transaction",
          entityId: id,
        })
      }

      // Update local state
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))

      // Update IndexedDB
      const currentTransactions = (await getFromIndexedDB("transactions")) || []
      const filteredTransactions = currentTransactions.filter((transaction: any) => transaction.id !== id)
      await saveToIndexedDB("transactions", filteredTransactions)

      return true
    } catch (error) {
      console.error("Error deleting transaction:", error)
      throw error
    }
  }

  return {
    transactions,
    isLoading,
    createTransaction: createTransactionHandler,
    updateTransaction: updateTransactionHandler,
    deleteTransaction,
  }
}

