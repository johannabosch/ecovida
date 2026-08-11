"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import { Check } from "lucide-react"

export function Consultation() {
  const t = useT()
  const benefits = useMemo(
    () =>
      [
        t("consultation.b1"),
        t("consultation.b2"),
        t("consultation.b3"),
        t("consultation.b4"),
        t("consultation.b5"),
      ].filter(Boolean),
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="book-consultation"
      className="scroll-mt-24 border-t border-border/50 bg-background py-12 md:py-14 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "rounded-2xl border border-border/60 bg-secondary/30 p-6 opacity-0 md:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10",
            isVisible && "animate-fade-in-up"
          )}
        >
          <div className="max-w-xl lg:flex-1">
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              {t("consultation.kicker")}
            </span>
            <h2 className="mt-2 font-serif text-2xl tracking-tight text-foreground md:text-3xl">
              <span className="text-balance">{t("consultation.h2")}</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("consultation.body")}
            </p>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-[13px] text-foreground/90"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 shrink-0 lg:mt-0 lg:text-right">
            <a
              href="#contact-form"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-7 py-2.5 text-xs font-semibold tracking-[0.14em] text-primary-foreground uppercase shadow-sm transition-[transform,box-shadow,background-color] hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
            >
              {t("consultation.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
