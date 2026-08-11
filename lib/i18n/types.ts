export type Locale = "en" | "fr" | "es" | "pt"

export const LOCALES: Locale[] = ["en", "fr", "es", "pt"]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
}

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: "Eng",
  fr: "Fra",
  es: "Esp",
  pt: "Por",
}

export const STORAGE_KEY = "ecovida-locale"
