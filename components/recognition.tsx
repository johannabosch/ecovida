"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const GWI_LOGO_SRC = "/images/GWI-logo.png"
const SHELTER_LOGO_SRC = "/images/shelter-logo.png"
const SLIDE_COUNT = 3
const AUTOPLAY_MS = 7500

const slideText =
  "text-[15px] leading-[1.7] tracking-[-0.01em] text-muted-foreground antialiased md:text-base md:leading-[1.75]"

function SlideSurface({
  children,
  className,
  centered,
}: {
  children: ReactNode
  className?: string
  centered?: boolean
}) {
  return (
    <div
      className={cn(
        "flex min-h-[17.5rem] flex-col justify-center gap-8 rounded-2xl border border-border/50 bg-white px-10 py-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] sm:px-12 md:min-h-[18rem] md:rounded-3xl md:px-16 md:py-11 lg:min-h-[19rem] lg:px-[4.5rem]",
        centered && "items-center text-center",
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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
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

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api) return
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const id = window.setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [api])

  return (
    <section
      ref={sectionRef}
      id="recognition"
      className="scroll-mt-24 border-t border-border bg-white py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-[11px] font-semibold tracking-[0.22em] text-muted-foreground/90 uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("recognition.kicker")}
          </span>
          <h2
            className={cn(
              "mt-3 font-serif text-4xl tracking-[-0.02em] text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("recognition.h2")}</span>
          </h2>
        </div>

        <div
          className={cn(
            "relative mx-auto mt-12 max-w-2xl opacity-0 md:mt-16 lg:max-w-3xl",
            isVisible && "animate-fade-in-up animation-delay-200"
          )}
        >
          <Carousel
            opts={{ loop: true, align: "start", duration: 22 }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3">
              <CarouselItem className="basis-full pl-2 md:pl-3">
                <SlideSurface centered>
                  <div className="relative h-24 w-full max-w-[13.5rem] shrink-0 sm:h-28 md:h-[7.5rem]">
                    <Image
                      src={GWI_LOGO_SRC}
                      alt="Global Wellness Institute"
                      fill
                      className="object-contain object-center"
                      sizes="260px"
                    />
                  </div>
                  <p className={cn(slideText, "max-w-md")}>{t("recognition.s1")}</p>
                </SlideSurface>
              </CarouselItem>

              <CarouselItem className="basis-full pl-2 md:pl-3">
                <SlideSurface centered>
                  <div className="relative h-[4.5rem] w-full max-w-[11rem] shrink-0 sm:h-24 md:h-28">
                    <Image
                      src={SHELTER_LOGO_SRC}
                      alt="Shelter Publications"
                      fill
                      className="object-contain object-center"
                      sizes="200px"
                    />
                  </div>
                  <p className={cn(slideText, "max-w-md")}>{t("recognition.s2")}</p>
                </SlideSurface>
              </CarouselItem>

              <CarouselItem className="basis-full pl-2 md:pl-3">
                <SlideSurface>
                  <div className={cn(slideText, "space-y-4")}>
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
                </SlideSurface>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              variant="outline"
              className="left-0 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-0 bg-white/95 text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition-[box-shadow,transform] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] md:-left-5"
            />
            <CarouselNext
              variant="outline"
              className="right-0 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-0 bg-white/95 text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition-[box-shadow,transform] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] md:-right-5"
            />
          </Carousel>

          <div
            className="mt-10 flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label={t("recognition.slideAria")}
          >
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1} of ${SLIDE_COUNT}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  i === current
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/45"
                )}
                onClick={() => api?.scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
