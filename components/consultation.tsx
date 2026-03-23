"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Quote } from "lucide-react"

const benefits = [
  "Understand the complete design-build process from vision to completion",
  "Gain clarity on realistic timelines and budget considerations",
  "Explore your project goals with an experienced architectural perspective",
  "Receive expert guidance tailored to Costa Rica's unique context",
  "Learn how ecological design can enhance both value and experience",
]

export function Consultation() {
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
      id="consultation"
      className="scroll-mt-24 bg-primary py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <span
              className={cn(
                "text-xs tracking-widest text-primary-foreground/70 uppercase opacity-0",
                isVisible && "animate-fade-in-up"
              )}
            >
              Begin Your Journey
            </span>
            <h2
              className={cn(
                "mt-4 font-serif text-4xl tracking-tight text-primary-foreground opacity-0 md:text-5xl",
                isVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              <span className="text-balance">Book a Consultation</span>
            </h2>
            <p
              className={cn(
                "mt-6 leading-relaxed text-primary-foreground/80 opacity-0",
                isVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              Whether you&apos;re in the early stages of dreaming or ready to break 
              ground, a consultation is the ideal first step. We work with clients 
              worldwide, offering both in-person and remote sessions tailored to 
              your project&apos;s unique needs and location.
            </p>

            <ul
              className={cn(
                "mt-8 space-y-4 opacity-0",
                isVisible && "animate-fade-in-up animation-delay-600"
              )}
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary-foreground/70" />
                  <span className="text-sm text-primary-foreground/90">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "mt-10 opacity-0",
                isVisible && "animate-fade-in-up animation-delay-600"
              )}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-primary-foreground/30 bg-primary-foreground px-8 py-4 text-sm font-medium tracking-widest text-primary uppercase transition-all hover:bg-primary-foreground/90"
              >
                Schedule Your Consultation
              </a>
            </div>
          </div>

          {/* Testimonial */}
          <div
            className={cn(
              "flex flex-col justify-center opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            <div className="border-l-2 border-primary-foreground/20 pl-8">
              <Quote className="h-8 w-8 text-primary-foreground/30" />
              <blockquote className="mt-6 font-serif text-xl leading-relaxed text-primary-foreground/90 md:text-2xl">
                &ldquo;Working with Ecovida transformed our vision into something far 
                more beautiful and thoughtful than we imagined. Their deep 
                understanding of ecological systems and refined aesthetics created 
                a home that feels both luxurious and completely at peace with its 
                surroundings.&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-medium text-primary-foreground">
                  Maria & Carlos Jiménez
                </p>
                <p className="text-sm text-primary-foreground/60">
                  Casa Monteverde, Guanacaste
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
