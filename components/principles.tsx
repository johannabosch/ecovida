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
        description: <p>{t("principles.ecological.body")}</p>,
      },
      {
        id: "climate",
        icon: Sun,
        title: t("principles.climate.title"),
        description: (
          <>
            <p className="mb-3 last:mb-0">{t("principles.climate.p1")}</p>
            <p>{t("principles.climate.p2")}</p>
          </>
        ),
      },
      {
        id: "durability",
        icon: Shield,
        title: t("principles.durability.title"),
        description: (
          <>
            <p className="mb-3 last:mb-0">{t("principles.durability.p1")}</p>
            <p>{t("principles.durability.p2")}</p>
          </>
        ),
      },
      {
        id: "cost",
        icon: PiggyBank,
        title: t("principles.cost.title"),
        description: <p>{t("principles.cost.body")}</p>,
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
      className="scroll-mt-24 bg-secondary py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
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
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("principles.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-4 text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("principles.intro")}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:gap-8 xl:gap-10">
          {philosophyBlocks.map((block, index) => (
            <div
              key={block.id}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-border/80 bg-background p-8 opacity-0 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-md md:p-9",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 80}ms` : "0ms",
              }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                <block.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl leading-snug text-foreground md:text-[1.35rem]">
                {block.title}
              </h3>
              <div className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {block.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
