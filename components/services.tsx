"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import { ClipboardList, FileStack, PenLine, Sparkles, Sun } from "lucide-react"

export function Services() {
  const t = useT()
  const serviceItems = useMemo(
    () => [
      {
        id: "i1",
        icon: FileStack,
        title: t("services.i1.title"),
        description: t("services.i1.body"),
      },
      {
        id: "i2",
        icon: PenLine,
        title: t("services.i2.title"),
        description: t("services.i2.body"),
      },
      {
        id: "i3",
        icon: Sparkles,
        title: t("services.i3.title"),
        description: t("services.i3.body"),
      },
      {
        id: "i4",
        icon: ClipboardList,
        title: t("services.i4.title"),
        description: t("services.i4.body"),
      },
      {
        id: "i5",
        icon: Sun,
        title: t("services.i5.title"),
        description: t("services.i5.body"),
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
      { threshold: 0.08 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="scroll-mt-24 bg-muted py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("services.kicker")}
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("services.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-4 text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("services.intro")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-6 lg:mt-14">
          {serviceItems.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "group border border-border/80 bg-background p-6 opacity-0 transition-shadow hover:shadow-md md:p-7",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 80}ms` : "0ms",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-base leading-snug text-foreground text-balance md:text-lg">
                {service.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
