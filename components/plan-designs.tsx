"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useT, type TranslationKey } from "@/lib/i18n/use-t"
import { Button } from "@/components/ui/button"
import type { PlanDesignCard } from "@/lib/get-plan-designs"

export type { PlanDesignCard }

const PLAN_PREVIEW_ROTATE_MS = 5500
const PLAN_PREVIEW_FADE_MS = 2200

const PLAN_IMAGE_ALTS: readonly TranslationKey[] = [
  "planDesigns.alt1",
  "planDesigns.alt2",
  "planDesigns.alt3",
]

function PlanDesignImageStack({
  images,
  imageAlt,
  imageObjectClassName,
  imageRotationDeg = 0,
  loadImages = true,
}: {
  images: string[]
  imageAlt: string
  imageObjectClassName: string
  imageRotationDeg?: number
  loadImages?: boolean
}) {
  const t = useT()
  const [failed, setFailed] = useState(() => images.length === 0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [renderedIndices, setRenderedIndices] = useState<number[]>([0])
  const [pauseRotation, setPauseRotation] = useState(false)

  const blockContext = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setPauseRotation(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (images.length <= 1 || failed || pauseRotation) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length)
    }, PLAN_PREVIEW_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [images.length, failed, pauseRotation])

  useEffect(() => {
    setRenderedIndices((current) =>
      current.includes(activeIndex) ? current : [...current, activeIndex]
    )

    const timer = window.setTimeout(() => {
      setRenderedIndices([activeIndex])
    }, PLAN_PREVIEW_FADE_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex])

  useEffect(() => {
    if (images.length <= 1) return
    const next = (activeIndex + 1) % images.length
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = images[next]
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [activeIndex, images])

  return (
    <div
      className="relative w-full select-none border-b border-border/50 bg-muted/50"
      onContextMenu={blockContext}
      onDragStart={blockContext}
      style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        aria-hidden={failed}
      >
        {!failed && images.length > 0 && loadImages ? (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {renderedIndices.map((i) => (
              <div
                key={images[i]}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity ease-in-out",
                  activeIndex === i ? "opacity-100" : "opacity-0"
                )}
                style={{
                  transitionDuration: `${PLAN_PREVIEW_FADE_MS}ms`,
                  zIndex: activeIndex === i ? 2 : 1,
                }}
              >
                <div
                  className="relative h-[135%] w-[135%] max-w-none"
                  style={
                    imageRotationDeg
                      ? { transform: `rotate(${imageRotationDeg}deg)` }
                      : undefined
                  }
                >
                  <Image
                    src={images[i]}
                    alt={imageAlt}
                    fill
                    className={cn(
                      "contrast-[0.96]",
                      imageObjectClassName
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                    draggable={false}
                    onError={() => setFailed(true)}
                    onContextMenu={blockContext}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full min-h-[10rem] items-center justify-center p-4 text-center text-xs leading-snug text-muted-foreground">
            {t("planDesigns.devHint")}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-foreground/10 to-transparent" />
        <p className="pointer-events-none absolute bottom-2 left-2 z-[4] rounded-md bg-background/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm">
          {t("planDesigns.previewStamp")}
        </p>
        {images.length > 1 && !failed && (
          <p className="pointer-events-none absolute bottom-2 right-2 z-[4] rounded-md bg-background/90 px-2 py-0.5 text-[9px] tabular-nums text-muted-foreground backdrop-blur-sm">
            {activeIndex + 1}/{images.length}
          </p>
        )}
      </div>
    </div>
  )
}

export function PlanDesignsSection({ plans }: { plans: PlanDesignCard[] }) {
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
      id="conceptual"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 bg-muted/20 py-16 md:py-20 lg:scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("planDesigns.kicker")}
          </span>
          <h2
            className={cn(
              "mt-3 font-serif text-3xl tracking-tight text-foreground opacity-0 md:text-4xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("planDesigns.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-muted-foreground opacity-0 md:text-[15px]",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("planDesigns.p1")}{" "}
            <span className="text-muted-foreground/80">{t("planDesigns.p2")}</span>
          </p>
        </div>

        <ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:mt-12">
          {plans.map((plan, planIndex) => {
            const altKey = PLAN_IMAGE_ALTS[planIndex]
            return (
              <li
                key={plan.id}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background opacity-0 shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,border-color] hover:border-border hover:shadow-md",
                  isVisible && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: isVisible ? `${(planIndex + 1) * 80}ms` : "0ms",
                }}
              >
                <PlanDesignImageStack
                  images={plan.images}
                  imageAlt={t(altKey)}
                  imageObjectClassName={plan.imageObjectClassName}
                  imageRotationDeg={plan.imageRotationDeg}
                  loadImages={isVisible}
                />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-primary/70 uppercase">
                    {String(planIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">
                    {plan.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                  <p className="mt-3 text-[10px] leading-snug text-muted-foreground/75">
                    {t("planDesigns.previewNote")}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 h-9 w-full rounded-full text-xs font-semibold tracking-wide"
                    asChild
                  >
                    <Link href="#contact-form">{t("planDesigns.getDesign")}</Link>
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>

        <div
          className={cn(
            "mx-auto mt-10 max-w-xl opacity-0 md:mt-12",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: isVisible ? "320ms" : "0ms" }}
        >
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background/80 px-6 py-7 text-center shadow-sm md:flex-row md:justify-between md:gap-6 md:px-8 md:text-left">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("planDesigns.p1")}
            </p>
            <Button
              variant="default"
              size="lg"
              className="h-10 shrink-0 rounded-full px-7 text-xs font-semibold tracking-[0.12em] uppercase"
              asChild
            >
              <Link href="#book-consultation">{t("planDesigns.inquire")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
