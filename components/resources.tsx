"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import { FileText, HelpCircle, ArrowRight } from "lucide-react"

export function Resources() {
  const t = useT()
  const resources = useMemo(
    () =>
      [
        {
          id: "faq" as const,
          icon: HelpCircle,
          title: t("resources.faq.title"),
          description: t("resources.faq.desc"),
          href: "#faq",
          linkText: t("resources.faq.link"),
        },
        {
          id: "articles" as const,
          icon: FileText,
          title: t("resources.articles.title"),
          description: t("resources.articles.desc"),
          href: "#articles",
          linkText: t("resources.articles.link"),
        },
      ],
    [t]
  )

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="scroll-mt-24 border-t border-border/50 bg-secondary/20 py-12 md:py-14 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center lg:mx-0 lg:text-left">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("resources.kicker")}
          </span>
          <h2
            className={cn(
              "mt-2 font-serif text-2xl tracking-tight text-foreground opacity-0 md:text-3xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("resources.h2")}</span>
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-8">
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              id={resource.id}
              className="scroll-mt-24 lg:scroll-mt-28"
            >
              <Link
                href={resource.href}
                className={cn(
                  "group flex h-full gap-3.5 rounded-xl border border-border/60 bg-background/90 p-4 opacity-0 transition-all hover:border-primary/25 hover:shadow-md md:p-5",
                  isVisible && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: isVisible ? `${(index + 2) * 60}ms` : "0ms",
                }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary">
                  <resource.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="mt-2.5 flex items-center text-xs font-medium text-primary transition-colors group-hover:text-accent">
                    {resource.linkText}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
