"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import {
  getIncome,
  createIncome as apiCreateIncome,
  updateIncome as apiUpdateIncome,
  deleteIncome as apiDeleteIncome,
} from "@/lib/api"
import { getFromIndexedDB, saveToIndexedDB } from "@/lib/indexed-db"

export function useIncome() {
  const { user } = useAuth()
  const { isOnline } = useNetworkStatus()
  const { addToSyncQueue } = useOfflineSync()
  const [incomeHistory, setIncomeHistory] = useState<any[]>([])
  const [income, setIncome] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIncome = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        if (isOnline) {
          // Fetch from API if online
          const data = await getIncome()
          setIncomeHistory(data)

          // Find current income
          const currentIncome = data.find((inc: any) => inc.current)
          setIncome(currentIncome || null)

          // Update IndexedDB for offline access
          await saveToIndexedDB("income", data)
        } else {
          // Get from IndexedDB if offline
          const offlineData = await getFromIndexedDB("income")
          setIncomeHistory(offlineData || [])

          // Find current income
          const currentIncome = offlineData?.find((inc: any) => inc.current)
          setIncome(currentIncome || null)
        }
      } catch (error) {
        console.error("Error fetching income:", error)

        // Fallback to IndexedDB if API fails
        try {
          const offlineData = await getFromIndexedDB("income")
          setIncomeHistory(offlineData || [])

          // Find current income
          const currentIncome = offlineData?.find((inc: any) => inc.current)
          setIncome(currentIncome || null)
        } catch (dbError) {
          console.error("Error fetching from IndexedDB:", dbError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchIncome()
  }, [user, isOnline])

  const createIncome = async (data: any) => {
    if (!user) throw new Error("User not authenticated")

    try {
      let newIncome

      if (isOnline) {
        // Create income via API if online
        newIncome = await apiCreateIncome(data)
      } else {
        // Create temporary income with local ID if offline
        newIncome = {
          ...data,
          id: `local_${Date.now()}`,
          createDate: new Date().toISOString(),
          lastUpdatedDate: null,
        }

        // Add to sync queue for later
        addToSyncQueue({
          endpoint: "/api/v1/Income",
          method: "POST",
          data,
          entityType: "income",
          entityId: newIncome.id,
        })
      }

      // If this is the current income, update other incomes to not be current
      let updatedIncomeHistory = [...incomeHistory]

      if (data.current) {
        updatedIncomeHistory = updatedIncomeHistory.map((inc) => ({
          ...inc,
          current: false,
        }))
      }

      // Add new income to history
      updatedIncomeHistory.push(newIncome)
      setIncomeHistory(updatedIncomeHistory)

      // Update current income if needed
      if (data.current) {
        setIncome(newIncome)
      }

      // Update IndexedDB
      await saveToIndexedDB("income", updatedIncomeHistory)

      return newIncome
    } catch (error) {
      console.error("Error creating income:", error)
      throw error
    }
  }

  const updateIncome = async (id: number | string, data: any) => {
    if (!user) throw new Error("User not authenticated")

    try {
      if (isOnline) {
        // Update via API if online
        await apiUpdateIncome(id, data)
      } else {
        // Add to sync queue for later
        addToSyncQueue({
          endpoint: `/api/v1/Income/${id}`,
          method: "PUT",
          data,
          entityType: "income",
          entityId: id,
        })
      }

      // If this is being set as current, update other incomes to not be current
      let updatedIncomeHistory = [...incomeHistory]

      if (data.current) {
        updatedIncomeHistory = updatedIncomeHistory.map((inc) => ({
          ...inc,
          current: inc.id === id ? true : false,
        }))
      } else {
        updatedIncomeHistory = updatedIncomeHistory.map((inc) =>
          inc.id === id ? { ...inc, ...data, lastUpdatedDate: new Date().toISOString() } : inc,
        )
      }

      setIncomeHistory(updatedIncomeHistory)

      // Update current income if needed
      if (data.current) {
        const updatedIncome = updatedIncomeHistory.find((inc) => inc.id === id)
        setIncome(updatedIncome || null)
      } else if (income && income.id === id) {
        setIncome({ ...income, ...data, lastUpdatedDate: new Date().toISOString() })
      }

      // Update IndexedDB
      await saveToIndexedDB("income", updatedIncomeHistory)

      return data
    } catch (error) {
      console.error("Error updating income:", error)
      throw error
    }
  }

  const deleteIncome = async (id: number | string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      if (isOnline) {
        // Delete via API if online
        await apiDeleteIncome(id)
      } else {
        // Add to sync queue for later
        addToSyncQueue({
          endpoint: `/api/v1/Income/${id}`,
          method: "DELETE",
          data: null,
          entityType: "income",
          entityId: id,
        })
      }

      // Update local state
      const updatedIncomeHistory = incomeHistory.filter((inc) => inc.id !== id)
      setIncomeHistory(updatedIncomeHistory)

      // Update current income if needed
      if (income && income.id === id) {
        setIncome(null)
      }

      // Update IndexedDB
      await saveToIndexedDB("income", updatedIncomeHistory)

      return true
    } catch (error) {
      console.error("Error deleting income:", error)
      throw error
    }
  }

  return {
    income,
    incomeHistory,
    isLoading,
    createIncome,
    updateIncome,
    deleteIncome,
  }
}

