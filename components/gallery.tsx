"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const featuredProjects = [
  {
    id: "casa-monteverde",
    category: "Residential",
    title: "Casa Monteverde",
    tagline:
      "Forest-edge residence with passive cooling and local stone.",
    images: ["/images/casa1.jpg"],
    detail:
      "Casa Monteverde is a private residence at the forest edge, composed as a calm counterpart to its setting. The plan emphasizes passive cooling, local stone, and views mediated by native canopy. The work reflects a commitment to durable, climate-responsive living in the Monteverde highlands.",
    scrollId: "residences" as const,
  },
  {
    id: "nosara-retreat",
    category: "Retreat resort",
    title: "Nosara Wellness Retreat",
    tagline:
      "Hospitality and wellness woven into coastal jungle context.",
    images: ["/images/casa3.jpg"],
    detail:
      "This retreat organizes guest pavilions, movement studios, and shared gathering spaces within a disciplined landscape framework. Roofs and overhangs are calibrated for shade and ocean breeze; outdoor rooms read as primary amenity. The project illustrates how refined hospitality and ecological restraint can reinforce one another on the Pacific coast.",
    scrollId: "resorts" as const,
  },
  {
    id: "rainforest-pavilion",
    category: "Residential",
    title: "Rainforest Pavilion",
    tagline:
      "Elevated living among the canopy with minimal ground impact.",
    images: ["/images/casa2.jpg"],
    detail:
      "Rainforest Pavilion elevates primary living above the forest floor to reduce site disturbance while maintaining immersion in the canopy. Structure and enclosure are kept legible; glass and deep eaves balance prospect, shelter, and privacy. The residence is intended as a light, long-lived insertion within a sensitive watershed context.",
    scrollId: undefined,
  },
  {
    id: "peninsula-residence",
    category: "Residential",
    title: "Peninsula Residence",
    tagline:
      "Ocean-facing living with deep overhangs and seamless indoor-outdoor rooms.",
    images: ["/images/casa4.jpg"],
    detail:
      "Peninsula Residence addresses a coastal lot with continuous horizontal emphasis and generous protection from sun and rain. Interior volumes open to covered terraces so daily life moves easily between inside and out. Materials and detailing are selected for longevity in a maritime climate.",
    scrollId: undefined,
  },
] as const

type FeaturedProject = (typeof featuredProjects)[number]

const conceptStudies = [
  {
    title: "Peninsula Yoga Shala",
    type: "Concept study",
    image: "/images/project-3.jpg",
  },
  {
    title: "Hillside Casita Study",
    type: "Sketch concept",
    image: "/images/project-1.jpg",
  },
  {
    title: "Tropical Office Pavilion",
    type: "Design exploration",
    image: "/images/project-2.jpg",
  },
  {
    title: "Lagoon Boardwalk Study",
    type: "Landscape concept",
    image: "/images/project-4.jpg",
  },
  {
    title: "Canopy Walk Residence",
    type: "Concept study",
    image: "/images/about.jpg",
  },
  {
    title: "Coastal Masterplan Fragment",
    type: "Planning study",
    image: "/images/hero.jpg",
  },
] as const

export function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [modalProject, setModalProject] = useState<FeaturedProject | null>(null)
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

  let animIndex = 0

  function FeaturedTile({
    project,
    onOpen,
    scrollId,
    sizesHint = "(max-width: 1280px) 100vw, 1280px",
  }: {
    project: FeaturedProject
    onOpen: () => void
    scrollId?: "residences" | "resorts"
    sizesHint?: string
  }) {
    const index = animIndex++
    return (
      <div
        id={scrollId}
        className={cn(
          scrollId && "scroll-mt-24 lg:scroll-mt-28"
        )}
      >
        <button
          type="button"
          onClick={onOpen}
          className={cn(
            "group relative w-full cursor-pointer overflow-hidden rounded-sm border border-transparent text-left opacity-0 outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
            "aspect-[4/3] md:aspect-[5/4]",
            isVisible && "animate-fade-in-up"
          )}
          style={{
            animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
          }}
          aria-label={`View details: ${project.title}`}
        >
          <Image
            src={project.images[0]}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={sizesHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <span className="text-xs tracking-widest text-primary-foreground/80 uppercase">
              {project.category}
            </span>
            <h3 className="mt-1 font-serif text-2xl text-primary-foreground md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/85">
              {project.tagline}
            </p>
            <span className="mt-4 text-xs font-medium tracking-wide text-primary-foreground/70 uppercase">
              View project
            </span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="scroll-mt-24 bg-background py-24 md:py-32 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <span
            className={cn(
              "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            Our Work
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">Featured Projects</span>
          </h2>
          <p
            className={cn(
              "mt-4 max-w-2xl text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            Four signature works: three residences and a retreat resort. Select a
            project to view a concise project summary.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 md:gap-8">
          {featuredProjects.map((project) => (
            <FeaturedTile
              key={project.id}
              project={project}
              scrollId={project.scrollId}
              onOpen={() => setModalProject(project)}
            />
          ))}
        </div>

        <Dialog
          open={modalProject !== null}
          onOpenChange={(open) => !open && setModalProject(null)}
        >
          {modalProject && (
            <DialogContent
              className="max-h-[min(90vh,calc(100%-2rem))] gap-0 overflow-y-auto rounded-sm border-border p-0 sm:max-w-2xl"
              showCloseButton
            >
              <div className="relative aspect-[16/10] w-full shrink-0 bg-muted">
                <Image
                  src={modalProject.images[0]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 100vw, 672px"
                  priority
                />
              </div>
              {modalProject.images.length > 1 && (
                <div className="grid grid-cols-2 gap-1 border-b border-border p-1 sm:grid-cols-3">
                  {modalProject.images.slice(1).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] bg-muted"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              )}
              <DialogHeader className="items-start gap-3 px-6 pb-6 pt-5 text-left">
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  {modalProject.category}
                </p>
                <DialogTitle className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
                  {modalProject.title}
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-left text-base leading-relaxed text-muted-foreground">
                    {modalProject.detail}
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>

        {/* Concepts & design studies */}
        <div
          id="conceptual"
          className="scroll-mt-24 border-t border-border pt-16 md:pt-20 lg:scroll-mt-28"
        >
          <div className="max-w-2xl">
            <span
              className={cn(
                "text-xs tracking-widest text-muted-foreground uppercase opacity-0",
                isVisible && "animate-fade-in-up"
              )}
            >
              More work
            </span>
            <h3
              className={cn(
                "mt-3 font-serif text-3xl tracking-tight text-foreground opacity-0 md:text-4xl",
                isVisible && "animate-fade-in-up animation-delay-200"
              )}
            >
              Concepts & design studies
            </h3>
            <p
              className={cn(
                "mt-3 text-muted-foreground opacity-0",
                isVisible && "animate-fade-in-up animation-delay-400"
              )}
            >
              Explorations, competition entries, and early-phase ideas that inform
              our built work.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {conceptStudies.map((item) => {
              const index = animIndex++
              return (
                <div
                  key={item.title}
                  className={cn(
                    "group relative aspect-square overflow-hidden opacity-0",
                    isVisible && "animate-fade-in-up"
                  )}
                  style={{
                    animationDelay: isVisible ? `${(index + 2) * 80}ms` : "0ms",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/50" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:p-4">
                    <span className="text-[10px] tracking-widest text-primary-foreground/80 uppercase md:text-xs">
                      {item.type}
                    </span>
                    <p className="mt-0.5 font-serif text-sm text-primary-foreground md:text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
