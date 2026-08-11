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
      className="scroll-mt-24 border-t border-border/50 bg-secondary/40 py-12 md:py-14 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center lg:mx-0 lg:text-left">
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
              "mt-2 font-serif text-2xl tracking-tight text-foreground opacity-0 md:text-3xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("services.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("services.intro")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {serviceItems.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "group flex gap-3 rounded-xl border border-border/60 bg-background/90 p-4 opacity-0 transition-shadow hover:shadow-md lg:flex-col lg:gap-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 60}ms` : "0ms",
              }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/80 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/5 lg:mb-2.5">
                <service.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-sm leading-snug text-foreground text-balance lg:text-[0.95rem]">
                  {service.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground lg:mt-1.5 lg:text-[13px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
