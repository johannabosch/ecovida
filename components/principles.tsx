"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Leaf, PiggyBank, Shield, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"

type PhilosophyBlock = {
  id: string
  icon: typeof Leaf
  title: string
  description: ReactNode
}

export function Principles() {
  const t = useT()
  const philosophyBlocks = useMemo((): PhilosophyBlock[] => {
    return [
      {
        id: "ecological",
        icon: Leaf,
        title: t("principles.ecological.title"),
        description: t("principles.ecological.body"),
      },
      {
        id: "climate",
        icon: Sun,
        title: t("principles.climate.title"),
        description: t("principles.climate.body"),
      },
      {
        id: "durability",
        icon: Shield,
        title: t("principles.durability.title"),
        description: t("principles.durability.body"),
      },
      {
        id: "cost",
        icon: PiggyBank,
        title: t("principles.cost.title"),
        description: t("principles.cost.body"),
      },
    ]
  }, [t])

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
      id="philosophy"
      className="scroll-mt-24 bg-secondary py-14 md:py-16 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center lg:mx-0 lg:text-left">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("principles.kicker")}
          </span>
          <h2
            className={cn(
              "mt-2 font-serif text-2xl tracking-tight text-foreground opacity-0 md:text-3xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("principles.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("principles.intro")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-9 lg:grid-cols-4 lg:gap-4">
          {philosophyBlocks.map((block, index) => (
            <div
              key={block.id}
              className={cn(
                "group flex gap-3.5 rounded-xl border border-border/60 bg-background/90 p-4 opacity-0 shadow-sm transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-md md:flex-col md:gap-0 md:p-5",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 60}ms` : "0ms",
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary md:mb-3">
                <block.icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-base leading-snug text-foreground md:text-[1.05rem]">
                  {block.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
