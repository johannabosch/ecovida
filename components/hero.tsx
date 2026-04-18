"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-provider"
import { HERO_SLIDES } from "@/lib/hero-slides"
import { useT, type TranslationKey } from "@/lib/i18n/use-t"
import { cn } from "@/lib/utils"

const HERO_LINE_KEYS = [
  "hero.line1",
  "hero.line2",
  "hero.line3",
  "hero.line4",
  "hero.line5",
  "hero.line6",
  "hero.line7",
] as const satisfies readonly TranslationKey[]

export function Hero() {
  const t = useT()
  const { contentRevealed } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  const reveal = contentRevealed
  /** One caption per slide; keep `HERO_LINE_KEYS` and `HERO_SLIDES` counts aligned. */
  const headlineIndex = activeSlide % HERO_LINE_KEYS.length

  useEffect(() => {
    /** Same interval for background photos and headline (one tick advances both). */
    const SLIDE_MS = 5500
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)
    }, SLIDE_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full scroll-mt-0 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-x-0 top-20 bottom-0 overflow-hidden md:top-24 lg:top-28">
        {HERO_SLIDES.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt={t("hero.imageAlt")}
            fill
            className={cn(
              "hero-background-image transition-opacity duration-[2400ms] ease-in-out",
              activeSlide === index ? "opacity-100" : "opacity-0"
            )}
            priority={index === 0}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center sm:px-6 md:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <p
            className={cn(
              "mb-3 max-w-2xl px-2 text-[11px] font-semibold tracking-[0.28em] text-primary-foreground/90 uppercase opacity-0 sm:mb-4 sm:text-xs md:text-[13px] md:tracking-[0.22em]",
              reveal && "hero-animate-fade-in-up"
            )}
          >
            {t("hero.eyebrow")}
          </p>
          <h1
            className={cn(
              "w-full max-w-full px-2 font-serif text-[clamp(1.65rem,6.25vw,2.15rem)] leading-none tracking-tight text-primary-foreground opacity-0 sm:px-1 sm:text-6xl md:text-7xl lg:text-8xl",
              reveal && "hero-animate-fade-in-up hero-animation-delay-200"
            )}
          >
            <span className="relative mx-auto block min-h-[2.65rem] w-full max-w-full sm:min-h-[4rem] md:min-h-[4.5rem] lg:min-h-[5.25rem]">
              {HERO_LINE_KEYS.map((key, i) => (
                <span
                  key={key}
                  className={cn(
                    "absolute inset-x-0 top-0 text-center transition-opacity duration-[2200ms] ease-in-out will-change-[opacity]",
                    "whitespace-nowrap px-1",
                    headlineIndex === i ? "opacity-100" : "opacity-0"
                  )}
                >
                  {t(key)}
                </span>
              ))}
            </span>
          </h1>
          <div
            className={cn(
              "mt-10 hidden opacity-0 md:mt-8 md:block",
              reveal && "hero-animate-fade-in-up hero-animation-delay-400"
            )}
          >
            <Link
              href="#conceptual"
              className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/60 bg-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest text-primary uppercase shadow-lg transition-all hover:bg-primary-foreground/90 hover:shadow-xl md:px-6 md:py-3 md:text-xs md:tracking-[0.2em]"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href="#about"
          aria-label={t("hero.scrollAria")}
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-foreground/45 px-6 py-3 opacity-0 shadow-md backdrop-blur-xs transition-all hover:bg-foreground/55 md:bottom-8 md:px-5 md:py-2.5",
            reveal && "hero-animate-fade-in hero-animation-delay-600"
          )}
        >
          <div className="flex flex-col items-center gap-2 md:gap-1.5">
            <span className="text-[11px] font-medium tracking-[0.2em] text-primary-foreground/90 uppercase md:text-[10px] md:tracking-[0.18em]">
              {t("hero.scroll")}
            </span>
            <div className="h-10 w-px bg-primary-foreground/65 md:h-8" />
          </div>
        </Link>
      </div>
    </section>
  )
}
