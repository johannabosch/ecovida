"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { InquiryModal } from "@/components/inquiry-modal"

type InquiryModalContextValue = {
  open: () => void
  close: () => void
}

const InquiryModalContext = createContext<InquiryModalContextValue | null>(
  null
)

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open: openModal, close: closeModal }),
    [openModal, closeModal]
  )

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
      <InquiryModal open={open} onOpenChange={setOpen} />
    </InquiryModalContext.Provider>
  )
}

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext)
  if (!ctx) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider")
  }
  return ctx
}
