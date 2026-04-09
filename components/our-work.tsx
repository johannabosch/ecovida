"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/use-t"
import type { FeaturedProject } from "@/lib/featured-project"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type { FeaturedProject }

function FeaturedProjectDialogBody({ project }: { project: FeaturedProject }) {
  const t = useT()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const total = project.images.length

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <>
      {total > 0 ? (
        <div className="relative w-full shrink-0 overflow-hidden rounded-t-2xl bg-muted">
          <Carousel
            key={project.id}
            opts={{ loop: total > 1 }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {project.images.map((src, imgIndex) => (
                <CarouselItem key={src} className="pl-0">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={src}
                      alt={`${project.title} gallery image ${imgIndex + 1} of ${total}. ${project.tagline}. ${t("ourWork.imageAltSuffix")}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                      priority={src === project.images[0]}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {total > 1 && (
              <>
                <CarouselPrevious
                  variant="secondary"
                  className="left-3 top-1/2 z-10 -translate-y-1/2 border-0 bg-background/90 text-foreground shadow-md hover:bg-background disabled:opacity-40"
                />
                <CarouselNext
                  variant="secondary"
                  className="right-3 top-1/2 z-10 -translate-y-1/2 border-0 bg-background/90 text-foreground shadow-md hover:bg-background disabled:opacity-40"
                />
                <p
                  className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-foreground/55 px-2.5 py-1 text-[11px] font-medium tabular-nums text-background"
                  aria-live="polite"
                >
                  {current + 1} / {total}
                </p>
              </>
            )}
          </Carousel>
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center rounded-t-2xl bg-muted px-6 text-center text-sm text-muted-foreground">
          {t("ourWork.dialog.addImages")}
        </div>
      )}
      <DialogHeader className="items-start gap-3 px-6 pb-6 pt-5 text-left">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {project.category}
        </p>
        <DialogTitle className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          {project.title}
        </DialogTitle>
        <p className="text-sm font-medium text-foreground">{project.year}</p>
        <div>
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t("ourWork.dialog.concepts")}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.concepts.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <DialogDescription asChild>
          <p className="text-left text-base leading-relaxed text-muted-foreground">
            {project.detail}
          </p>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export function OurWork({ projects }: { projects: FeaturedProject[] }) {
  const t = useT()
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
    sizesHint = "(max-width: 1024px) 100vw, 896px",
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
            "group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-transparent text-left opacity-0 outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
            "aspect-[4/3] md:aspect-[5/4]",
            isVisible && "animate-fade-in-up"
          )}
          style={{
            animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
          }}
          aria-label={`View details: ${project.title}`}
        >
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={`${project.title}. ${project.tagline}. ${t("ourWork.imageAltSuffix")}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={sizesHint}
            />
          ) : (
            <div
              className="absolute inset-0 bg-muted"
              aria-hidden
            />
          )}
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
              {t("ourWork.viewProject")}
            </span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="work"
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
            {t("ourWork.kicker")}
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-4xl tracking-tight text-foreground opacity-0 md:text-5xl",
              isVisible && "animate-fade-in-up animation-delay-200"
            )}
          >
            <span className="text-balance">{t("ourWork.h2")}</span>
          </h2>
          <p
            className={cn(
              "mt-4 max-w-2xl text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up animation-delay-400"
            )}
          >
            {t("ourWork.intro")}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 md:gap-8 lg:mx-auto lg:max-w-4xl">
          {projects.map((project) => (
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
              className="max-h-[min(90vh,calc(100%-2rem))] gap-0 overflow-y-auto overflow-x-hidden rounded-2xl border-border p-0 sm:max-w-2xl"
              showCloseButton
            >
              <FeaturedProjectDialogBody project={modalProject} />
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}
