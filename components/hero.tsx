"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full scroll-mt-0 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury eco-resort architecture in tropical setting"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <h1
            className={cn(
              "font-serif text-5xl tracking-tight text-primary-foreground opacity-0 md:text-7xl lg:text-8xl",
              isLoaded && "animate-fade-in-up"
            )}
          >
            <span className="block text-balance">Spatial Eco Living</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 opacity-0 md:text-xl",
              isLoaded && "animate-fade-in-up animation-delay-200"
            )}
          >
            Designing refined, ecological spaces rooted in wellness and place
          </p>
          <div
            className={cn(
              "mt-10 opacity-0",
              isLoaded && "animate-fade-in-up animation-delay-400"
            )}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-sm font-medium tracking-widest text-primary-foreground uppercase backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
            >
              Start Your Project
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0",
            isLoaded && "animate-fade-in animation-delay-600"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest text-primary-foreground/60 uppercase">
              Scroll
            </span>
            <div className="h-12 w-px bg-primary-foreground/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
