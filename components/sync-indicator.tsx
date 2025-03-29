"use client"

import { useEffect, useState } from "react"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import { useNetworkStatus } from "@/hooks/use-network-status"
import { useTranslation } from "@/hooks/use-translation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CloudOff, RefreshCw } from "lucide-react"

export function SyncIndicator() {
  const { isOnline } = useNetworkStatus()
  const { pendingItems, syncData, isSyncing, progress } = useOfflineSync()
  const { t } = useTranslation()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (pendingItems > 0 && isOnline && !isSyncing) {
      setShowAlert(true)
    } else if (pendingItems === 0 || !isOnline) {
      setShowAlert(false)
    }
  }, [pendingItems, isOnline, isSyncing])

  if (!showAlert && !isSyncing) return null

  return (
    <Alert className="mb-6">
      {isSyncing ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>{t("sync.syncing")}</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <Progress value={progress} className="h-2 w-full" />
              <p className="mt-1 text-xs text-muted-foreground">
                {t("sync.syncingItems", { count: pendingItems.toString() })}
              </p>
            </div>
          </AlertDescription>
        </>
      ) : (
        <>
          <CloudOff className="h-4 w-4" />
          <AlertTitle>{t("sync.pendingChanges")}</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{t("sync.pendingChangesDescription", { count: pendingItems.toString() })}</span>
            <Button size="sm" onClick={syncData} className="mt-2">
              {t("sync.syncNow")}
            </Button>
          </AlertDescription>
        </>
      )}
    </Alert>
  )
}

