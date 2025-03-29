"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"

export const NetworkStatusContext = createContext<{
  isOnline: boolean
  lastOnlineAt: Date | null
}>({
  isOnline: true,
  lastOnlineAt: null,
})

export function NetworkStatusProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(isOnline ? new Date() : null)
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setLastOnlineAt(new Date())
      toast({
        title: t("network.online"),
        description: t("network.onlineDescription"),
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: t("network.offline"),
        description: t("network.offlineDescription"),
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast, t])

  return <NetworkStatusContext.Provider value={{ isOnline, lastOnlineAt }}>{children}</NetworkStatusContext.Provider>
}

