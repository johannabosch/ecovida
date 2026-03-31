"use client"

const areas = [
  {
    id: "systems",
    title: "Systems",
    description:
      "Integrated building systems (structure, envelope, MEP, and water) are coordinated early so performance, maintenance, and ecology stay aligned through construction and occupancy.",
  },
  {
    id: "accomplishments",
    title: "Accomplishments",
    description:
      "From coastal residences to hospitality and retreat work across Costa Rica, Hawaii, and beyond, our portfolio reflects a consistent focus on craft, climate, and context.",
  },
  {
    id: "interior",
    title: "Interior Architecture",
    description:
      "Materials, light, and flow are treated as part of the architecture: interiors extend the landscape and support daily rituals without competing with the setting.",
  },
  {
    id: "exterior",
    title: "Exterior Architecture",
    description:
      "Roofs, overhangs, outdoor rooms, and landscape edges are designed as one composition, protecting from sun and rain while opening views and connection to place.",
  },
] as const

export function FocusAreas() {
  return (
    <section className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Depth of practice
          </span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Systems & architecture
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {areas.map((area) => (
            <article
              key={area.id}
              id={area.id}
              className="scroll-mt-24 border border-border bg-background p-8 md:p-10 lg:scroll-mt-28"
            >
              <h3 className="font-serif text-xl text-foreground md:text-2xl">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
