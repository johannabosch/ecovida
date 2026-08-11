"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
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

const HERO_HOLD_MS = 6800
const HERO_CROSSFADE_MS = 2800
const HERO_CYCLE_MS = HERO_HOLD_MS + HERO_CROSSFADE_MS
const HERO_EASING = "cubic-bezier(0.42, 0, 0.18, 1)"

function slidesToRender(active: number, count: number) {
  const next = (active + 1) % count
  return active === next ? [active] : [active, next]
}

export function Hero() {
  const t = useT()
  const { contentRevealed } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const [outgoingSlide, setOutgoingSlide] = useState<number | null>(null)
  const [outgoingFading, setOutgoingFading] = useState(false)
  const [renderedSlides, setRenderedSlides] = useState<number[]>(() =>
    slidesToRender(0, HERO_SLIDES.length)
  )
  const [reducedMotion, setReducedMotion] = useState(false)
  const prevActiveRef = useRef(0)

  const reveal = contentRevealed
  const slideCount = HERO_SLIDES.length
  const headlineIndex =
    slideCount === HERO_LINE_KEYS.length
      ? activeSlide
      : activeSlide % HERO_LINE_KEYS.length

  const heroMotionStyle = {
    "--hero-cycle-ms": `${HERO_CYCLE_MS}ms`,
    "--hero-crossfade-ms": `${HERO_CROSSFADE_MS}ms`,
    "--hero-easing": HERO_EASING,
  } as CSSProperties

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount)
    }, HERO_CYCLE_MS)

    return () => clearInterval(timer)
  }, [reducedMotion, slideCount])

  useEffect(() => {
    if (activeSlide === prevActiveRef.current) return

    const previous = prevActiveRef.current
    prevActiveRef.current = activeSlide
    setOutgoingSlide(previous)
    setOutgoingFading(false)

    const fadeTimer = window.setTimeout(() => setOutgoingFading(true), 32)
    const cleanupTimer = window.setTimeout(() => {
      setOutgoingSlide(null)
      setOutgoingFading(false)
    }, HERO_CROSSFADE_MS + 48)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(cleanupTimer)
    }
  }, [activeSlide])

  useEffect(() => {
    setRenderedSlides((current) => {
      const next = (activeSlide + 1) % slideCount
      const merged = new Set([...current, activeSlide, next])
      if (outgoingSlide !== null) merged.add(outgoingSlide)
      return Array.from(merged)
    })
  }, [activeSlide, slideCount, outgoingSlide])

  useEffect(() => {
    const next = (activeSlide + 1) % slideCount
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = HERO_SLIDES[next]
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [activeSlide, slideCount])

  return (
    <section
      id="hero"
      className="relative h-screen w-full scroll-mt-0 overflow-hidden"
      style={heroMotionStyle}
    >
      {/* Background — soft crossfade */}
      <div className="absolute inset-0 isolate overflow-hidden bg-black/20">
        {renderedSlides.map((index) => {
          const isActive = activeSlide === index
          const isOutgoing = outgoingSlide === index

          return (
            <div
              key={HERO_SLIDES[index]}
              className={cn(
                "absolute inset-0 transform-gpu",
                isOutgoing &&
                  cn(
                    "hero-fade-out z-[2] opacity-100",
                    outgoingFading && "opacity-0"
                  ),
                isActive && "z-[1] opacity-100",
                !isActive && !isOutgoing && "pointer-events-none z-0 opacity-0"
              )}
            >
              <Image
                src={HERO_SLIDES[index]}
                alt={t("hero.imageAlt")}
                fill
                className="hero-background-image"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          )
        })}

        <div className="pointer-events-none absolute inset-0 z-[3] bg-black/18" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/30 via-black/18 to-black/32" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.22)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center sm:px-6 md:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <p
            className={cn(
              "mb-3 max-w-2xl px-2 text-[11px] font-semibold tracking-[0.28em] text-primary-foreground/85 uppercase opacity-0 sm:mb-4 sm:text-xs md:text-[13px] md:tracking-[0.22em]",
              reveal && "hero-animate-fade-in-up"
            )}
          >
            {t("hero.eyebrow")}
          </p>

          <h1
            className={cn(
              "w-full max-w-full px-2 font-serif text-[clamp(1.65rem,6.25vw,2.15rem)] leading-none tracking-tight text-primary-foreground opacity-0 sm:px-1 sm:text-5xl md:text-5xl lg:text-6xl",
              reveal && "hero-animate-fade-in-up hero-animation-delay-200"
            )}
          >
            <span className="relative mx-auto block min-h-[2.65rem] w-full max-w-full sm:min-h-[3.25rem] md:min-h-[3.5rem] lg:min-h-[4rem]">
              {HERO_LINE_KEYS.map((key, i) => (
                <span
                  key={key}
                  className={cn(
                    "hero-crossfade absolute inset-x-0 top-0 text-center whitespace-nowrap px-1 will-change-[opacity,transform]",
                    headlineIndex === i
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  )}
                >
                  {t(key)}
                </span>
              ))}
            </span>
          </h1>

          <div
            key={headlineIndex}
            className={cn(
              "mt-5 h-px w-16 origin-center bg-gradient-to-r from-transparent via-primary-foreground/70 to-transparent opacity-0 md:mt-6 md:w-24",
              reveal && "hero-headline-rule"
            )}
            aria-hidden
          />

          <div
            className={cn(
              "mt-10 hidden opacity-0 md:mt-8 md:block",
              reveal && "hero-animate-fade-in-up hero-animation-delay-400"
            )}
          >
            <Link
              href="#conceptual"
              className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 bg-primary-foreground/5 px-5 py-2 text-[11px] font-medium tracking-[0.14em] text-primary-foreground/80 uppercase shadow-none backdrop-blur-[2px] transition-colors hover:border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide progress + index */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-6 md:px-8 md:pb-7">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
            <div className="h-px flex-1 overflow-hidden bg-primary-foreground/20">
              <div
                key={activeSlide}
                className="hero-slide-progress h-full bg-primary-foreground/75"
                style={{ animationDuration: `${HERO_CYCLE_MS}ms` }}
              />
            </div>
            <p className="shrink-0 font-serif text-[11px] tracking-[0.28em] text-primary-foreground/75 tabular-nums">
              {String(activeSlide + 1).padStart(2, "0")}
              <span className="mx-1.5 text-primary-foreground/35">/</span>
              {String(slideCount).padStart(2, "0")}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
