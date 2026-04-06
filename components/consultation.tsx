"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import { Check } from "lucide-react"
import { useMemo } from "react"

export function Consultation() {
  const t = useT()
  const benefits = useMemo(
    () => [
      t("consultation.b1"),
      t("consultation.b2"),
      t("consultation.b3"),
      t("consultation.b4"),
      t("consultation.b5"),
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
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 bg-gradient-to-b from-secondary/70 via-muted/40 to-background py-20 md:py-28 lg:scroll-mt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-primary/[0.07]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,oklch(0.55_0.05_145_/_0.12),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <div
          className={cn(
            "rounded-3xl border border-border/70 bg-card/85 p-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] backdrop-blur-sm md:p-12 lg:p-14",
            "opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <div className="text-center">
            <span
              className={cn(
                "text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase opacity-0",
                isVisible && "animate-fade-in-up"
              )}
            >
              {t("consultation.kicker")}
            </span>
            <h2
              className={cn(
                "mt-4 font-serif text-[2rem] font-normal tracking-[-0.02em] text-foreground opacity-0 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
                isVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              <span className="text-balance">{t("consultation.h2")}</span>
            </h2>
            <p
              className={cn(
                "mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground opacity-0 md:text-base",
                isVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              {t("consultation.body")}
            </p>
          </div>

          <ul
            className={cn(
              "mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2",
              isVisible && "animate-fade-in-up animation-delay-600"
            )}
          >
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 border-l-2 border-primary/25 pl-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                </span>
                <span className="text-left text-sm leading-snug text-foreground/90">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-10 flex justify-center opacity-0",
              isVisible && "animate-fade-in-up animation-delay-600"
            )}
          >
            <a
              href="#contact-form"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 py-2.5 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase shadow-md transition-[transform,box-shadow,background-color] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              {t("consultation.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
