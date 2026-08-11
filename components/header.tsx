"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SiteLogo } from "@/components/site-logo"
import { useLanguage } from "@/components/i18n/language-provider"
import { LanguageToggle } from "@/components/i18n/language-toggle"
import { useT } from "@/lib/i18n/use-t"

type NavChild = { id: string; name: string; href: string }
type NavItem =
  | { id: string; name: string; href: string }
  | { id: string; name: string; href: string; children: NavChild[] }

/** After hero headline fade-in (~0.8s) so desktop nav appears second */
const DESKTOP_HEADER_REVEAL_MS = 900

export function Header() {
  const t = useT()
  const { contentRevealed } = useLanguage()
  const navigation: NavItem[] = useMemo(
    () => [
      { id: "home", name: t("nav.home"), href: "#hero" },
      {
        id: "about",
        name: t("nav.about"),
        href: "#about",
        children: [
          {
            id: "recognition",
            name: t("nav.about.recognition"),
            href: "#recognition",
          },
          {
            id: "philosophy",
            name: t("nav.about.philosophy"),
            href: "#philosophy",
          },
          { id: "services", name: t("nav.about.services"), href: "#services" },
        ],
      },
      {
        id: "work",
        name: t("nav.ourWork"),
        href: "#work",
        children: [
          { id: "featured", name: t("nav.work.featured"), href: "#work" },
          { id: "studio", name: t("nav.work.studio"), href: "#studio-gallery" },
          { id: "plans", name: t("nav.work.plans"), href: "#conceptual" },
          { id: "residences", name: t("nav.work.residences"), href: "#residences" },
          { id: "resorts", name: t("nav.work.resorts"), href: "#resorts" },
        ],
      },
      {
        id: "resources",
        name: t("nav.resources"),
        href: "#resources",
        children: [
          { id: "faq", name: t("nav.resources.faq"), href: "#faq" },
          { id: "articles", name: t("nav.resources.articles"), href: "#articles" },
        ],
      },
    ],
    [t]
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const desktopNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRevealed) {
      setIsVisible(false)
      return
    }
    const timer = setTimeout(() => setIsVisible(true), DESKTOP_HEADER_REVEAL_MS)
    return () => clearTimeout(timer)
  }, [contentRevealed])

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
        "absolute top-0 left-0 right-0 z-50 transition-opacity duration-700",
        !contentRevealed && "pointer-events-none opacity-0",
        contentRevealed && "opacity-100",
        contentRevealed &&
          !isVisible &&
          "lg:pointer-events-none lg:opacity-0",
        "border-b border-border/45 bg-[#f8f3ed]/72 shadow-sm backdrop-blur-md transition-[background-color,border-color,backdrop-filter] duration-300 lg:hover:border-border/60 lg:hover:bg-[#f8f3ed] lg:hover:backdrop-blur-none"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 lg:gap-3 lg:px-8 lg:py-2">
        <div className="flex min-w-0 shrink-0 lg:flex-1">
          <Link
            href="#hero"
            className="-m-1 flex items-center p-1 lg:-m-1 lg:p-0.5"
          >
            <SiteLogo
              priority
              className="h-11 max-h-[2.85rem] w-auto max-w-[min(14rem,56vw)] object-contain object-left sm:h-12 sm:max-h-none sm:max-w-none md:h-14 lg:h-11"
            />
          </Link>
        </div>

        {/* Mobile: menu only (language lives inside the slide-out panel) */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground lg:-m-2.5 lg:p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t("header.openMenu")}</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation: submenus open on hover */}
        <div
          ref={desktopNavRef}
          className="hidden lg:flex lg:gap-x-10"
        >
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div
                  className="flex items-center gap-0.5"
                  aria-expanded={openDropdown === item.id}
                  aria-haspopup="true"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:font-bold hover:text-foreground",
                      openDropdown === item.id && "font-bold text-foreground"
                    )}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 shrink-0 text-foreground/90 transition-transform duration-200",
                      openDropdown === item.id && "rotate-180 text-foreground"
                    )}
                    aria-hidden
                  />
                </div>

                {openDropdown === item.id && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div
                      className="w-56 rounded-sm border border-border bg-background py-2 shadow-lg"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          role="menuitem"
                          className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:font-bold"
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
                key={item.id}
                href={item.href}
                className="text-sm font-medium tracking-wide text-foreground/90 transition-colors hover:font-bold hover:text-foreground"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-3">
          <LanguageToggle variant="header" />
          <Link
            href="#contact-form"
            className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-primary/45 bg-primary/[0.07] px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-primary hover:bg-primary hover:font-bold hover:text-primary-foreground hover:shadow-md lg:px-4 lg:py-1.5 lg:text-xs"
          >
            {t("nav.contact")}
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
              <span className="sr-only">{t("header.closeMenu")}</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 border-b border-border pb-6">
            <p className="mb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              {t("common.language")}
            </p>
            <LanguageToggle
              variant="header"
              className="h-10 w-full max-w-none justify-between gap-2 px-3"
            />
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-1 py-6">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.id} className="-mx-3">
                      <div className="flex w-full items-center gap-1 rounded-lg pr-1">
                        <Link
                          href={item.href}
                          className="min-w-0 flex-1 px-3 py-2 text-left text-base font-medium text-foreground hover:bg-muted hover:font-bold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          className="flex shrink-0 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-expanded={openMobileSection === item.id}
                          aria-label={`${item.name} submenu`}
                          onClick={() =>
                            setOpenMobileSection((open) =>
                              open === item.id ? null : item.id
                            )
                          }
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              openMobileSection === item.id && "rotate-180"
                            )}
                            aria-hidden
                          />
                        </button>
                      </div>
                      {openMobileSection === item.id && (
                        <div className="ml-2 mt-1 space-y-0.5 border-l border-border py-1 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className="block rounded-md py-2 text-sm text-muted-foreground hover:bg-muted/80 hover:font-bold hover:text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={item.id} className="-mx-3">
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:font-bold"
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
                  href="#contact-form"
                  className="-mx-3 block rounded-full border-2 border-primary/45 bg-primary/[0.07] px-4 py-3 text-center text-base font-semibold text-foreground shadow-sm transition-all hover:scale-[1.02] hover:border-primary hover:bg-primary hover:font-bold hover:text-primary-foreground hover:shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
