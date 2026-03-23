"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Leaf, Sun, Droplets } from "lucide-react"

const principles = [
  {
    icon: Leaf,
    title: "Ecological Integration",
    description:
      "Every design begins with a deep study of the site's ecosystems, ensuring our structures enhance rather than diminish the natural environment.",
  },
  {
    icon: Sun,
    title: "Climate Responsiveness",
    description:
      "Passive design strategies and natural ventilation reduce energy dependence while maximizing comfort in tropical climates.",
  },
  {
    icon: Droplets,
    title: "Natural Materials",
    description:
      "We prioritize locally-sourced, sustainable materials that age gracefully and connect inhabitants to their surroundings.",
  },
]

export function Principles() {
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
      id="principles"
      className="scroll-mt-24 bg-secondary py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            Our Philosophy
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">Design Principles</span>
          </h2>
          <p
            className={cn(
              "mt-4 text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            The foundational values that guide every project we undertake
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className={cn(
                "group relative bg-background p-8 opacity-0 transition-shadow hover:shadow-lg",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center text-primary">
                <principle.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-xl text-foreground">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
