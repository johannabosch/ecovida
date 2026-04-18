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
  planTitle,
  imageAlt,
  imageObjectClassName,
}: {
  images: string[]
  planTitle: string
  imageAlt: string
  imageObjectClassName: string
}) {
  const t = useT()
  const [failed, setFailed] = useState(() => images.length === 0)
  const [activeIndex, setActiveIndex] = useState(0)
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

  return (
    <div
      className="relative w-full select-none"
      onContextMenu={blockContext}
      onDragStart={blockContext}
      style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
    >
      <div
        className="group relative aspect-[4/3] w-full max-h-[14rem] overflow-hidden rounded-xl border border-border/50 bg-muted/80 shadow-[0_20px_56px_-16px_rgba(0,0,0,0.22),0_8px_24px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] sm:max-h-[16rem] md:aspect-[5/4] md:max-h-[17rem] lg:max-h-[19rem]"
        aria-hidden={failed}
      >
        {!failed && images.length > 0 ? (
          <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="relative h-full min-h-0 w-full transition-transform duration-500 ease-out will-change-transform md:group-hover:scale-[1.02]">
              {images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={imageAlt}
                  fill
                  className={cn(
                    "absolute inset-0 contrast-[0.96]",
                    imageObjectClassName,
                    "transition-opacity ease-in-out",
                    activeIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    transitionDuration: `${PLAN_PREVIEW_FADE_MS}ms`,
                    zIndex: activeIndex === i ? 2 : 1,
                  }}
                  sizes="(max-width: 768px) 90vw, 288px"
                  draggable={false}
                  priority={i === 0}
                  onError={() => setFailed(true)}
                  onContextMenu={blockContext}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[12rem] items-center justify-center p-4 text-center text-xs leading-snug text-muted-foreground">
            {t("planDesigns.devHint")}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-background/25 to-transparent" />
        <p className="pointer-events-none absolute bottom-2.5 left-1/2 z-[4] max-w-[92%] -translate-x-1/2 rounded-full bg-background/85 px-3 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm transition-opacity duration-200 md:group-hover:opacity-0">
          {t("planDesigns.previewStamp")}
        </p>
        {!failed && images.length > 0 && (
          <div className="pointer-events-none absolute inset-0 z-[5] hidden items-center justify-center bg-foreground/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 md:flex md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            <Button
              variant="secondary"
              size="default"
              className="pointer-events-auto rounded-full px-6 text-xs font-semibold tracking-wide shadow-lg"
              asChild
            >
              <Link
                href="#contact-form"
                aria-label={`${t("planDesigns.getDesign")}: ${planTitle}`}
              >
                {t("planDesigns.getDesign")}
              </Link>
            </Button>
          </div>
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
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/25 via-background to-background py-20 md:py-28 lg:scroll-mt-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(42vh,24rem)] bg-gradient-to-b from-primary/[0.07] to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className={cn(
              "text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("planDesigns.kicker")}
          </span>
          <h2
            className={cn(
              "mt-3 font-serif text-[1.75rem] font-normal tracking-[-0.02em] text-foreground opacity-0 sm:text-3xl md:text-[2.125rem] md:leading-[1.15]",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("planDesigns.h2")}</span>
          </h2>
        </div>

        <ul className="mt-10 flex list-none flex-col gap-7 md:mt-12 md:gap-8 lg:mx-auto lg:max-w-5xl">
          {plans.map((plan, planIndex) => {
            const index = planIndex
            const altKey = PLAN_IMAGE_ALTS[planIndex]
            return (
              <li
                key={plan.id}
                className={cn(
                  "rounded-2xl border border-border/50 bg-card/30 p-5 opacity-0 shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,border-color] hover:border-border hover:shadow-md sm:p-6 md:p-8",
                  isVisible && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: isVisible ? `${(index + 1) * 90}ms` : "0ms",
                }}
              >
                <div className="flex flex-col gap-7 md:flex-row md:items-center md:gap-12 lg:gap-14">
                  <div className="mx-auto w-full max-w-[min(100%,22rem)] shrink-0 sm:max-w-[24rem] md:mx-0 md:w-[min(100%,26rem)]">
                    <PlanDesignImageStack
                      images={plan.images}
                      planTitle={plan.title}
                      imageAlt={t(altKey)}
                      imageObjectClassName={plan.imageObjectClassName}
                    />
                    <p className="mt-3 text-center text-[10px] leading-snug text-muted-foreground/90 md:text-left">
                      {t("planDesigns.previewNote")}
                    </p>
                    <div className="mt-4 md:hidden">
                      <Button
                        variant="default"
                        className="h-10 w-full rounded-full text-xs font-semibold tracking-wide sm:w-auto"
                        asChild
                      >
                        <Link href="#contact-form">{t("planDesigns.getDesign")}</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 text-center md:pt-0 md:text-left">
                    <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.4rem] lg:text-[1.65rem]">
                      {plan.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-[15px] md:leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <div
          className={cn(
            "mx-auto mt-12 max-w-2xl text-center opacity-0 md:mt-14",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: isVisible ? "200ms" : "0ms" }}
        >
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {t("planDesigns.p1")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90">
            {t("planDesigns.p2")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              variant="default"
              size="lg"
              className="h-11 rounded-full px-8 text-xs font-semibold tracking-[0.14em] uppercase shadow-md transition-[transform,box-shadow] hover:shadow-lg active:scale-[0.98]"
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
