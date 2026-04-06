"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-provider"
import { HERO_SLIDES } from "@/lib/hero-slides"
import { useT } from "@/lib/i18n/use-t"
import { cn } from "@/lib/utils"

export function Hero() {
  const t = useT()
  const { contentRevealed } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  const reveal = contentRevealed

  useEffect(() => {
    const SLIDE_MS = 9000
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <h1
            className={cn(
              "font-serif text-5xl tracking-tight text-primary-foreground opacity-0 md:text-7xl lg:text-8xl",
              reveal && "hero-animate-fade-in-up"
            )}
          >
            <span className="relative block min-h-[1.2em] w-full">
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-opacity duration-[2200ms] ease-in-out will-change-[opacity]",
                  activeSlide % 2 === 0 ? "opacity-100" : "opacity-0"
                )}
              >
                {t("hero.line1")}
              </span>
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-opacity duration-[2200ms] ease-in-out will-change-[opacity]",
                  activeSlide % 2 === 0 ? "opacity-0" : "opacity-100"
                )}
              >
                {t("hero.line2")}
              </span>
            </span>
          </h1>
          <div
            className={cn(
              "mx-auto mt-6 max-w-2xl opacity-0 md:mt-5 lg:max-w-3xl",
              reveal && "hero-animate-fade-in-up hero-animation-delay-200"
            )}
          >
            <p
              className={cn(
                "rounded-2xl border border-white/20 bg-black/45 px-5 py-4 text-left text-base font-medium leading-relaxed text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:text-center md:px-7 md:py-5 md:text-[17px] md:leading-relaxed lg:text-lg",
                "[text-shadow:0_1px_2px_rgba(0,0,0,0.9)]"
              )}
            >
              {t("hero.body")}
            </p>
          </div>
          <div
            className={cn(
              "mt-10 opacity-0 md:mt-8",
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
