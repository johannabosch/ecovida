"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const heroSlides = [
  "/images/casa2.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
] as const

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full scroll-mt-0 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-x-0 top-20 bottom-0 md:top-24 lg:top-28">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt="EcoLuxury ecoresort and eco-home design"
            fill
            className={cn(
              "hero-background-image transition-opacity duration-1000",
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
              isLoaded && "animate-fade-in-up"
            )}
          >
            <span className="relative block min-h-[1.2em] w-full">
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-opacity duration-700",
                  activeSlide % 2 === 0 ? "opacity-100" : "opacity-0"
                )}
              >
                Enhanced Wellness
              </span>
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-opacity duration-700",
                  activeSlide % 2 === 0 ? "opacity-0" : "opacity-100"
                )}
              >
                EcoLiving Design
              </span>
            </span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 opacity-0 md:text-xl",
              isLoaded && "animate-fade-in-up animation-delay-200"
            )}
          >
            Spatial Enhanced Wellness Living
          </p>
          <div
            className={cn(
              "mt-10 opacity-0",
              isLoaded && "animate-fade-in-up animation-delay-400"
            )}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/60 bg-primary-foreground px-8 py-4 text-sm font-semibold tracking-widest text-primary uppercase shadow-lg transition-all hover:bg-primary-foreground/90 hover:shadow-xl"
            >
              Start Your Project
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href="#about"
          aria-label="Scroll to next section"
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-foreground/45 px-6 py-3 opacity-0 shadow-md backdrop-blur-xs transition-all hover:bg-foreground/55",
            isLoaded && "animate-fade-in animation-delay-600"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.2em] text-primary-foreground/90 uppercase">
              Scroll
            </span>
            <div className="h-10 w-px bg-primary-foreground/65" />
          </div>
        </Link>
      </div>
    </section>
  )
}
