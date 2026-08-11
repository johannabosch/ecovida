"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"

const DESKTOP_MAX_ROWS = 3

export function StudioGallery({ images }: { images: string[] }) {
  const t = useT()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  /** Enough columns on desktop so all images fit in at most 3 rows. */
  const desktopColumns = useMemo(
    () => Math.max(3, Math.ceil(images.length / DESKTOP_MAX_ROWS)),
    [images.length]
  )

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

  if (images.length === 0) return null

  let i = 0

  return (
    <section
      ref={sectionRef}
      id="studio-gallery"
      className="scroll-mt-24 border-t border-border bg-muted/35 py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {t("studio.kicker")}
          </span>
          <h2
            className={cn(
              "mt-3 font-serif text-3xl tracking-tight text-foreground opacity-0 md:text-4xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            {t("studio.h2")}
          </h2>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-muted-foreground opacity-0 md:text-base",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("studio.body")}
          </p>
        </div>
        <div
          className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:[grid-template-columns:repeat(var(--studio-cols),minmax(0,1fr))]"
          style={
            {
              "--studio-cols": desktopColumns,
            } as React.CSSProperties
          }
        >
          {images.map((src, imgIndex) => {
            const delayIndex = i++
            return (
              <div
                key={src}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-xl opacity-0 shadow-lg ring-1 ring-border/60",
                  isVisible && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: isVisible ? `${Math.min(delayIndex * 60, 480)}ms` : "0ms",
                }}
              >
                {isVisible ? (
                  <Image
                    src={src}
                    alt={`${t("studio.imageAlt")} (${imgIndex + 1})`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted" aria-hidden />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
