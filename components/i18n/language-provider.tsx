"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Locale } from "@/lib/i18n/types"
import { LOCALES, STORAGE_KEY } from "@/lib/i18n/types"

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v)
}

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Kept for components that waited for the old first-visit gate; always true */
  landingReady: boolean
  /** Kept for hero/header reveal timing; always true without the gate */
  contentRevealed: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && isLocale(saved)) {
        setLocaleState(saved)
      }
    } catch {
      // ignore
    }
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang =
      locale === "en" ? "en" : locale === "pt" ? "pt" : locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      landingReady: true,
      contentRevealed: true,
    }),
    [locale, setLocale]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return ctx
}
