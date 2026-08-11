"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"

const GWI_LOGO_SRC = "/images/GWI-logo.png"
const SHELTER_LOGO_SRC = "/images/shelter-logo.png"

function AccoladeCard({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      style={style}
      className={cn(
        "flex flex-col rounded-xl border border-border/60 bg-background/90 p-4 shadow-sm transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-md md:p-5",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Recognition() {
  const t = useT()
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
      id="recognition"
      className="scroll-mt-24 border-t border-border/50 bg-background py-14 md:py-16 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center lg:mx-0 lg:text-left">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("recognition.kicker")}
          </span>
          <h2
            className={cn(
              "mt-2 font-serif text-2xl tracking-tight text-foreground opacity-0 md:text-3xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("recognition.h2")}</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-9">
          <AccoladeCard
            className={cn(
              "items-center text-center opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{
              animationDelay: isVisible ? "120ms" : "0ms",
            }}
          >
            <div className="relative mb-3 h-14 w-full max-w-[9.5rem] shrink-0">
              <Image
                src={GWI_LOGO_SRC}
                alt="Global Wellness Institute"
                fill
                className="object-contain object-center"
                sizes="152px"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {t("recognition.s1")}
            </p>
          </AccoladeCard>

          <AccoladeCard
            className={cn(
              "items-center text-center opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{
              animationDelay: isVisible ? "180ms" : "0ms",
            }}
          >
            <div className="relative mb-3 h-12 w-full max-w-[8.5rem] shrink-0">
              <Image
                src={SHELTER_LOGO_SRC}
                alt="Shelter Publications"
                fill
                className="object-contain object-center"
                sizes="136px"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {t("recognition.s2")}
            </p>
          </AccoladeCard>

          <AccoladeCard
            className={cn(
              "sm:col-span-2 opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{
              animationDelay: isVisible ? "240ms" : "0ms",
            }}
          >
            <div className="flex gap-3.5 md:gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary">
                <Award className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
                <p>{t("recognition.s3p1")}</p>
                <p>
                  {t("recognition.s3p2a")}
                  <Link
                    href="https://www.thebrando.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline decoration-primary/30 underline-offset-[3px] transition-colors hover:decoration-primary"
                  >
                    thebrando.com
                  </Link>
                  {t("recognition.s3p2b")}
                </p>
              </div>
            </div>
          </AccoladeCard>
        </div>
      </div>
    </section>
  )
}
