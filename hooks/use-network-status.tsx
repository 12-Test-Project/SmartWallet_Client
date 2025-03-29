"use client"

import { useContext } from "react"
import { NetworkStatusContext } from "@/components/network-status-provider"

export function useNetworkStatus() {
  const context = useContext(NetworkStatusContext)

  if (!context) {
    throw new Error("useNetworkStatus must be used within a NetworkStatusProvider")
  }

  return context
}

