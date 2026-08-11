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
      className="relative scroll-mt-24 overflow-x-hidden bg-background pb-10 pt-6 md:pb-12 md:pt-10 lg:scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-16 h-[min(28rem,70vw)] w-[min(28rem,70vw)] rounded-full bg-primary/[0.065] blur-3xl motion-reduce:blur-none" />
        <div className="absolute -left-28 bottom-24 h-[min(22rem,60vw)] w-[min(22rem,60vw)] rounded-full bg-secondary/55 blur-3xl motion-reduce:blur-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center",
          introVisible && "about-image-reveal",
          !introVisible && "opacity-0"
        )}
      >
        <div className="relative -mt-4 h-[min(24rem,72vw)] w-[min(40rem,96vw)] opacity-[0.085] sm:-mt-6 sm:h-[min(28rem,68vw)] sm:w-[min(46rem,92vw)] md:h-[min(26rem,42vw)] md:w-[min(48rem,72vw)] lg:h-[min(24rem,36vw)]">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain object-top"
            sizes="(max-width: 768px) 96vw, 780px"
            loading="lazy"
          />
        </div>
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-4xl">
          <div className="flex min-w-0 flex-col justify-center pt-[min(10rem,30vw)] sm:pt-[min(12rem,28vw)] md:pt-[min(7rem,12vw)] lg:pt-[min(8rem,10vw)]">
            <span
              className={cn(
                "text-center text-xs tracking-widest text-muted-foreground uppercase",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up"
              )}
            >
              {t("about.kicker")}
            </span>
            <h2
              className={cn(
                "mt-4 text-center font-serif text-[2rem] leading-tight tracking-tight text-foreground sm:mt-5 sm:text-4xl md:text-5xl",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              <span className="text-balance">{t("about.h2")}</span>
            </h2>
            <div
              className={cn(
                "mt-5 text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-base",
                !introVisible && "opacity-0",
                introVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              <p>{t("about.p1")}</p>
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
