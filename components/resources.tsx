"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FileText, HelpCircle, ArrowRight } from "lucide-react"

const resources = [
  {
    id: "faq" as const,
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our design process, timelines, and what to expect when working with Eco-Vida Designs.",
    href: "#faq",
    linkText: "Browse FAQ",
  },
  {
    id: "articles" as const,
    icon: FileText,
    title: "Articles & Insights",
    description:
      "Explore our thoughts on ecological architecture, sustainable living, and design for tropical and temperate climates worldwide.",
    href: "#articles",
    linkText: "Read Articles",
  },
]

export function Resources() {
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
      id="resources"
      className="scroll-mt-24 bg-background py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            Learn More
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">Resources</span>
          </h2>
          <p
            className={cn(
              "mt-4 text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            Helpful information to guide your architectural journey
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {resources.map((resource, index) => (
            <div
              key={resource.title}
              id={resource.id}
              className="scroll-mt-24 lg:scroll-mt-28"
            >
            <Link
              href={resource.href}
              className={cn(
                "group flex h-full flex-col border border-border p-8 opacity-0 transition-all hover:border-primary hover:shadow-lg",
                isVisible && "animate-fade-in-up"
              )}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center text-primary">
                <resource.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl text-foreground">
                {resource.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary transition-colors group-hover:text-accent">
                {resource.linkText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
