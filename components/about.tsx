"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function About() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-24 bg-background py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/5] overflow-hidden opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            <Image
              src="/images/about.jpg"
              alt="Ecovida architectural studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span
              className={cn(
                "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
                isVisible && "animate-fade-in-up"
              )}
            >
              About Ecovida
            </span>
            <h2
              className={cn(
                "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
                isVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              <span className="text-balance">Architecture in Harmony with Nature</span>
            </h2>
            <div
              className={cn(
                "mt-6 space-y-4 text-muted-foreground opacity-0",
                isVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              <p className="leading-relaxed">
                With over two decades of experience designing in tropical environments, 
                we approach each project as an opportunity to create spaces that honor 
                both human wellbeing and ecological integrity.
              </p>
              <p className="leading-relaxed">
                Our practice is rooted in the belief that exceptional architecture 
                emerges from deep understanding of place: its climate, materials,
                culture, and rhythms. Every design decision we make serves the
                greater purpose of creating environments that restore and inspire.
              </p>
              <p className="leading-relaxed">
                From private residences to wellness retreats, our work across Costa Rica
                shows sustainable design and refined aesthetics working together as
                essential partners.
              </p>
            </div>
            <div
              className={cn(
                "mt-8 opacity-0",
                isVisible && "animate-fade-in-up animation-delay-600"
              )}
            >
              <a
                href="#principles"
                className="inline-flex items-center text-sm font-medium tracking-wide text-primary transition-colors hover:text-accent"
              >
                Learn More About Our Approach
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
