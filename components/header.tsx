"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SiteLogo } from "@/components/site-logo"

const navigation = [
  { name: "Home", href: "#hero" },
  {
    name: "About",
    href: "#about",
    children: [
      { name: "Ecological Design Principles", href: "#principles" },
      { name: "Services", href: "#services" },
      { name: "Systems", href: "#systems" },
      { name: "Accomplishments", href: "#accomplishments" },
      { name: "Interior Architecture", href: "#interior" },
      { name: "Exterior Architecture", href: "#exterior" },
    ],
  },
  {
    name: "Portfolio",
    href: "#portfolio",
    children: [
      { name: "Residences", href: "#residences" },
      { name: "Resorts", href: "#resorts" },
      { name: "Conceptual Design", href: "#conceptual" },
    ],
  },
  {
    name: "Resources",
    href: "#resources",
    children: [
      { name: "FAQ", href: "#faq" },
      { name: "Articles", href: "#articles" },
    ],
  },
  {
    name: "Contact",
    href: "#contact",
    children: [
      { name: "Bookings", href: "#contact" },
      { name: "Info", href: "#contact" },
    ],
  },
]

/** After hero headline fade-in (~0.8s) so desktop nav appears second */
const DESKTOP_HEADER_REVEAL_MS = 900

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const desktopNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), DESKTOP_HEADER_REVEAL_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) setOpenMobileSection(null)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!openDropdown) return
    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [openDropdown])

  useEffect(() => {
    if (!openDropdown) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [openDropdown])

  return (
    <header
      className={cn(
        "absolute top-0 left-0 right-0 z-50 opacity-100 lg:transition-opacity lg:duration-700",
        isVisible
          ? "lg:pointer-events-auto lg:opacity-100"
          : "lg:pointer-events-none lg:opacity-0",
        "border-b border-border/80 bg-[#f8f3ed] shadow-sm"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 lg:gap-3 lg:px-8 lg:py-5">
        <div className="flex min-w-0 shrink-0 lg:flex-1">
          <Link
            href="#hero"
            className="-m-1 flex items-center p-1 lg:-m-1.5 lg:p-1.5"
          >
            <SiteLogo priority className="h-14 w-auto md:h-16 lg:h-20" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground lg:-m-2.5 lg:p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation: submenus open on click, not hover */}
        <div
          ref={desktopNavRef}
          className="hidden lg:flex lg:gap-x-10"
        >
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:text-foreground",
                    openDropdown === item.name && "text-foreground"
                  )}
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenDropdown((open) =>
                      open === item.name ? null : item.name
                    )
                  }
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 shrink-0 transition-transform duration-200",
                      openDropdown === item.name && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>

                {openDropdown === item.name && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="w-56 rounded-sm border border-border bg-background py-2 shadow-lg">
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                      <div className="my-1 h-px bg-border" />
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#contact"
            className="text-sm font-medium tracking-wide text-primary-foreground/90 transition-colors hover:text-primary-foreground lg:text-foreground/90 lg:hover:text-foreground"
          >
            Book Consultation
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden",
          mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-1 py-6">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.name} className="-mx-3">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-base font-medium text-foreground hover:bg-muted"
                        aria-expanded={openMobileSection === item.name}
                        onClick={() =>
                          setOpenMobileSection((open) =>
                            open === item.name ? null : item.name
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                            openMobileSection === item.name && "rotate-180"
                          )}
                          aria-hidden
                        />
                      </button>
                      {openMobileSection === item.name && (
                        <div className="ml-2 mt-1 space-y-0.5 border-l border-border py-1 pl-3">
                          <Link
                            href={item.href}
                            className="block rounded-md py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-md py-2 text-sm text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={item.name} className="-mx-3">
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div className="py-6">
                <Link
                  href="#contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-primary hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
