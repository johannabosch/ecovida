"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"

export function About() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const [introVisible, setIntroVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 overflow-x-hidden bg-background py-16 md:py-24 lg:scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-16 h-[min(28rem,70vw)] w-[min(28rem,70vw)] rounded-full bg-primary/[0.065] blur-3xl motion-reduce:blur-none" />
        <div className="absolute -left-28 bottom-24 h-[min(22rem,60vw)] w-[min(22rem,60vw)] rounded-full bg-secondary/55 blur-3xl motion-reduce:blur-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-4xl">
          <div
            className={cn(
              "mb-8 flex flex-col items-center text-center sm:mb-9",
              introVisible && "about-image-reveal",
              !introVisible && "opacity-0"
            )}
          >
            <div className="relative h-[3.5rem] w-full max-w-[min(260px,calc(100vw-2rem))] shrink-0 rounded-lg shadow-xl ring-1 ring-black/[0.06] sm:h-28 sm:max-w-[min(280px,85vw)] md:h-32">
              <Image
                src="/logo.png"
                alt={t("about.logoAlt")}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 85vw, 320px"
                priority
              />
            </div>
            <span
              className={cn(
                "mt-6 text-xs tracking-widest text-muted-foreground uppercase",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up"
              )}
            >
              {t("about.kicker")}
            </span>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <h2
              className={cn(
                "text-center font-serif text-[2rem] leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              <span className="text-balance">
                {t("about.h2")}
              </span>
            </h2>
            <div
              className={cn(
                "mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-base",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              <p>
                {t("about.p1a")}
                <a
                  href="https://earthship.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  {t("about.earthshipsLink")}
                </a>
                {t("about.p1b")}
              </p>
              <p>{t("about.p2")}</p>
            </div>
            <div
              className={cn(
                "mt-7 flex justify-center sm:mt-8",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up animation-delay-600"
              )}
            >
              <Link
                href="#philosophy"
                className="group inline-flex items-center text-sm font-medium tracking-wide text-primary transition-colors hover:text-accent"
              >
                {t("about.learnMore")}
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
