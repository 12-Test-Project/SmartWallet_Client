"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import es from "@/locales/es"
import en from "@/locales/en"

export const I18nContext = createContext<{
  locale: string
  t: (key: string, params?: Record<string, string>) => string
  changeLocale: (locale: string) => void
}>({
  locale: "es",
  t: () => "",
  changeLocale: () => {},
})

const locales = {
  es,
  en,
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorage("locale", "es")
  const [translations, setTranslations] = useState(locales.es)

  useEffect(() => {
    setTranslations(locales[locale as keyof typeof locales] || locales.es)
  }, [locale])

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (!value[k]) return key
      value = value[k]
    }

    if (typeof value !== "string") return key

    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`\\{${key}\\}`, "g"), value)
      }, value)
    }

    return value
  }

  const changeLocale = (newLocale: string) => {
    if (locales[newLocale as keyof typeof locales]) {
      setLocale(newLocale)
    }
  }

  return <I18nContext.Provider value={{ locale, t, changeLocale }}>{children}</I18nContext.Provider>
}

