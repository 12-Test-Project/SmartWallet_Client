"use client"

import { useState, useEffect, useCallback } from "react"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { getFromIndexedDB, saveToIndexedDB } from "@/lib/indexed-db"

interface SyncQueueItem {
  id?: string
  endpoint: string
  method: string
  data: any
  entityType: string
  entityId: string | number
  createdAt: string
}

export function useOfflineSync() {
  const { isOnline } = useNetworkStatus()
  const { user } = useAuth()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Load sync queue from IndexedDB
  useEffect(() => {
    const loadSyncQueue = async () => {
      if (!user) return

      try {
        const queue = await getFromIndexedDB("syncQueue")
        if (queue) {
          setSyncQueue(queue)
        }
      } catch (error) {
        console.error("Error loading sync queue:", error)
      }
    }

    loadSyncQueue()
  }, [user])

  // Add item to sync queue
  const addToSyncQueue = useCallback(
    async (item: Omit<SyncQueueItem, "id" | "createdAt">) => {
      if (!user) return

      const newItem: SyncQueueItem = {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }

      const updatedQueue = [...syncQueue, newItem]
      setSyncQueue(updatedQueue)

      try {
        await saveToIndexedDB("syncQueue", updatedQueue)
      } catch (error) {
        console.error("Error saving sync queue:", error)
      }
    },
    [syncQueue, user],
  )

  // Sync data when online
  const syncData = useCallback(async () => {
    if (!isOnline || !user || syncQueue.length === 0 || isSyncing) return

    setIsSyncing(true)
    setProgress(0)

    let successCount = 0
    let failCount = 0
    const totalItems = syncQueue.length
    const newQueue = [...syncQueue]

    for (let i = 0; i < newQueue.length; i++) {
      const item = newQueue[i]

      try {
        const response = await fetch(item.endpoint, {
          method: item.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwToken}`,
          },
          body: item.method !== "DELETE" ? JSON.stringify(item.data) : undefined,
        })

        if (response.ok) {
          // Remove from queue on success
          newQueue.splice(i, 1)
          i--
          successCount++
        } else {
          failCount++
        }
      } catch (error) {
        console.error("Error syncing item:", error)
        failCount++
      }

      // Update progress
      setProgress(Math.round(((i + 1) / totalItems) * 100))
    }

    // Update sync queue
    setSyncQueue(newQueue)
    await saveToIndexedDB("syncQueue", newQueue)

    setIsSyncing(false)

    // Show toast with results
    if (successCount > 0 || failCount > 0) {
      toast({
        title: t("sync.syncComplete"),
        description: t("sync.syncResults", {
          success: successCount.toString(),
          fail: failCount.toString(),
        }),
      })
    }
  }, [isOnline, user, syncQueue, isSyncing, toast, t])

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && syncQueue.length > 0 && !isSyncing) {
      syncData()
    }
  }, [isOnline, syncQueue.length, isSyncing, syncData])

  return {
    pendingItems: syncQueue.length,
    addToSyncQueue,
    syncData,
    isSyncing,
    progress,
  }
}

