"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { authenticateUser } from "@/lib/api"
import { useLocalStorage } from "@/hooks/use-local-storage"

export const AuthContext = createContext<{
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage("user", null)
  const [token, setToken] = useLocalStorage("token", "")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if token exists and is valid
    if (token && user) {
      // In a real app, you would validate the token here
      setIsLoading(false)
    } else {
      setUser(null)
      setToken("")
      setIsLoading(false)
    }
  }, [token, user, setUser, setToken])

  const login = async (email: string, password: string) => {
    try {
      const userData = await authenticateUser(email, password)

      if (!userData || userData.hasError) {
        throw new Error(userData?.error || "Authentication failed")
      }

      // Asegurarse de que el token JWT esté disponible
      if (!userData.jwToken) {
        console.error("JWT token not found in response:", userData)
        throw new Error("JWT token not found in response")
      }

      // Guardar el usuario y el token
      setUser(userData)
      setToken(userData.jwToken)

      // Guardar en localStorage para acceso directo
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", userData.jwToken)

      // Store token in IndexedDB for offline access
      if (typeof window !== "undefined" && "indexedDB" in window) {
        try {
          const db = await openDatabase()
          const tx = db.transaction("auth", "readwrite")
          const store = tx.objectStore("auth")
          await store.put({ id: "token", value: userData.jwToken })
          await store.put({ id: "user", value: userData })
          await tx.complete
        } catch (dbError) {
          console.error("Error storing auth in IndexedDB:", dbError)
        }
      }

      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken("")

    // Limpiar localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Clear token from IndexedDB
    if (typeof window !== "undefined" && "indexedDB" in window) {
      openDatabase()
        .then((db) => {
          const tx = db.transaction("auth", "readwrite")
          const store = tx.objectStore("auth")
          store.delete("token")
          store.delete("user")
          tx.complete
        })
        .catch((error) => {
          console.error("Error clearing auth from IndexedDB:", error)
        })
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

async function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("smartWalletAuth", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains("auth")) {
        db.createObjectStore("auth", { keyPath: "id" })
      }
    }
  })
}

