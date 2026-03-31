"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Compass, Grid3X3, Leaf, MessageSquare } from "lucide-react"

const services = [
  {
    icon: Compass,
    title: "EcoArchitectural design, suited for any climate in any region of the world",
    description:
      "Full-service architectural design from concept through construction documentation, tailored to tropical climates and ecological principles.",
    features: [
      "Site analysis & master planning",
      "Schematic design development",
      "Construction documents",
      "Project administration",
    ],
  },
  {
    icon: Grid3X3,
    title: "Master Planning",
    description:
      "Comprehensive site planning for hospitality, residential, and mixed-use developments that honor natural systems and community needs.",
    features: [
      "Land use optimization",
      "Infrastructure planning",
      "Phasing strategies",
      "Community integration",
    ],
  },
  {
    icon: Leaf,
    title: "Ecological Systems",
    description:
      "Integration of sustainable technologies and natural systems to create regenerative buildings that give back to their environment.",
    features: [
      "Rainwater harvesting",
      "Solar & renewable energy",
      "Natural wastewater treatment",
      "Landscape integration",
    ],
  },
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "Expert guidance for clients at any stage of their project, whether refining a vision or troubleshooting existing designs.",
    features: [
      "Design review & critique",
      "Feasibility studies",
      "Sustainability consulting",
      "Material selection",
    ],
  },
]

export function Services() {
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
      id="services"
      className="scroll-mt-24 bg-muted py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            What We Offer
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">Our Services</span>
          </h2>
          <p
            className={cn(
              "mt-4 text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            Comprehensive architectural services for discerning clients
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group bg-background p-8 opacity-0 transition-shadow hover:shadow-lg md:p-10",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl leading-snug text-foreground text-balance md:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-foreground"
                  >
                    <span className="mr-3 h-1 w-1 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
