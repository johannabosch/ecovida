"use client"

import { useMemo } from "react"
import { useLanguage } from "@/components/i18n/language-provider"
import type { Locale } from "@/lib/i18n/types"
import { en, type EnKeys } from "@/lib/i18n/locales/en"
import { fr } from "@/lib/i18n/locales/fr"
import { es } from "@/lib/i18n/locales/es"
import { pt } from "@/lib/i18n/locales/pt"

const overrides: Record<Locale, Partial<Record<EnKeys, string>>> = {
  en: {},
  fr,
  es,
  pt,
}

export type TranslationKey = EnKeys

export function useT() {
  const { locale } = useLanguage()
  return useMemo(() => {
    const table = { ...en, ...overrides[locale] } as Record<EnKeys, string>
    return (key: EnKeys) => table[key]
  }, [locale])
}
