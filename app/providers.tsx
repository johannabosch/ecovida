"use client"

import { InquiryModalProvider } from "@/components/inquiry-modal-provider"
import { LanguageProvider } from "@/components/i18n/language-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InquiryModalProvider>{children}</InquiryModalProvider>
    </LanguageProvider>
  )
}
