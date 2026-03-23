import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"
import { Instagram, Linkedin, Facebook } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Resources", href: "#resources" },
    { name: "Contact", href: "#contact" },
  ],
  portfolio: [
    { name: "Residences", href: "#residences" },
    { name: "Resorts", href: "#resorts" },
    { name: "Conceptual", href: "#conceptual" },
  ],
  contact: [
    { name: "Bookings", href: "#contact" },
    { name: "General Info", href: "#contact" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Facebook", href: "#", icon: Facebook },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#hero" className="inline-block">
              <SiteLogo className="h-9 w-auto md:h-10" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Designing refined, ecological spaces rooted in wellness and place. 
              Based in Costa Rica, serving clients worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
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

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
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

          {/* Portfolio */}
          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              Portfolio
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.portfolio.map((item) => (
                <li key={item.name}>
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

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium tracking-widest text-foreground uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.contact.map((item) => (
                <li key={item.name}>
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
                  href="mailto:info@eco-vidadesigns.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  info@eco-vidadesigns.com
                </a>
              </li>
              <li>
                <a
                  href="https://eco-vidadesigns.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  eco-vidadesigns.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Ecovida Design Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#contact"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#contact"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
