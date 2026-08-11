"use client"

import Link from "next/link"
import { WHATSAPP_URL } from "@/lib/contact"
import { LanguageToggle } from "@/components/i18n/language-toggle"
import { SiteLogo } from "@/components/site-logo"
import { useT } from "@/lib/i18n/use-t"
import { Instagram, Linkedin, Facebook } from "lucide-react"

const social = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Facebook", href: "#", icon: Facebook },
] as const

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  const mainLinks = [
    { name: t("footer.link.home"), href: "#hero" },
    { name: t("footer.link.about"), href: "#about" },
    { name: t("footer.link.recognition"), href: "#recognition" },
    { name: t("footer.link.philosophy"), href: "#philosophy" },
    { name: t("footer.link.services"), href: "#services" },
    { name: t("footer.link.work"), href: "#work" },
    { name: t("footer.link.getInTouch"), href: "#book-consultation" },
    { name: t("footer.link.resources"), href: "#resources" },
    { name: t("footer.link.contact"), href: "#contact-form" },
  ]

  const portfolioLinks = [
    { name: t("footer.link.featured"), href: "#work" },
    { name: t("footer.link.studio"), href: "#studio-gallery" },
    { name: t("footer.link.plans"), href: "#conceptual" },
    { name: t("footer.link.residences"), href: "#residences" },
    { name: t("footer.link.resorts"), href: "#resorts" },
  ]

  const contactLinks = [
    { name: t("footer.link.bookings"), href: "#contact-form" },
    { name: t("footer.link.generalInfo"), href: "#contact-form" },
  ]

  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="lg:col-span-1">
            <Link href="#hero" className="inline-block">
              <SiteLogo className="h-9 w-auto md:h-10" />
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex gap-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              {t("footer.col.navigation")}
            </h3>
            <ul className="mt-3 space-y-2">
              {mainLinks.map((item) => (
                <li key={item.href + item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              {t("footer.col.portfolio")}
            </h3>
            <ul className="mt-3 space-y-2">
              {portfolioLinks.map((item) => (
                <li key={item.href + item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              {t("footer.col.contact")}
            </h3>
            <ul className="mt-3 space-y-2">
              {contactLinks.map((item) => (
                <li key={item.href + item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.eco-vidadesigns.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  eco-vidadesigns.com
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("footer.whatsappLine")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
              <p className="text-xs text-muted-foreground">
                © {year} {t("footer.rights")}
              </p>
              <LanguageToggle variant="footer" />
            </div>
            <div className="flex gap-6">
              <Link
                href="#contact-form"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="#contact-form"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
