/** Site-wide SEO constants (English — primary crawl language). */
export const SITE_URL = "https://eco-vidadesigns.com"
export const SITE_NAME = "Eco-Vida Designs"

export const SEO_DESCRIPTION =
  "Ecological architecture studio. Luxury eco homes, wellness retreats, and licensed plan sets. Passive tropical design, post-and-beam EcoArch, and off-grid integration. Costa Rica, Hawaii, United States, Portugal."

/** Crawlable supplementary copy — visually hidden on page, not shown to users. */
export const SEO_HIDDEN_COPY = `
Eco-Vida Designs is an ecological architecture studio led by Michael Bond-Crowley, architect (University of Costa Rica, UCR), with more than four decades in ecological architecture, design-build, and project management. The practice delivers passive tropical design, post-and-beam EcoArch, licensed plan sets, custom EcoArch, renewable and off-grid integration, and build-ready drawings for eco luxury homes, eco resorts, eco retreats, and enhanced wellness living.

Work is grounded in place-led architecture, regenerative living, and climate-responsive design: natural ventilation, integrated solar and water systems, permaculture-informed landscapes, helical-pile foundations, and envelopes shaped for hurricane-force winds and seismic resilience. Proprietary post-and-pier and post-and-beam systems, cut lists for prefabrication, and time-tested material treatments support cost-efficient turnkey delivery.

Completed and in-progress projects span Costa Rica, Hawaii, the United States, and Portugal. Recognition includes Best Eco Designs on Earth (Global Wellness Institute and Global Wellness Summit, 2020), Shelter Publications features, television and Better Homes and Gardens coverage, and commissions including residences associated with the Marlon Brando estate (thebrando.com), Sheryl Crow's recording studio, and private clients across Los Angeles, Telluride, Hawaii, South Africa, Vermont, and beyond. Michael Bond-Crowley's training includes apprenticeship with Michael Reynolds (Earthships).

Services: ready-to-build plan sets with Google Earth site vectoring; full-scale eco architecture plans and elevations; EcoArch plan sets with wellness landscape design; project design and management; integrated off-grid systems including solar, greywater, and regenerative indoor growing. Plan design studies include modern off-grid post-and-beam series, quad eco dwelling hexagonal modules, and single eco home packages.

Keywords: ecological architecture, eco architecture, EcoArch, eco home, eco resort, eco retreat, ecoluxury, wellness design, sustainable architecture, luxury eco homes, passive tropical design, post-and-beam, off-grid living, Costa Rica architect, Hawaii architect, Portugal eco design, enhanced wellness living, spatial wellness, natural hospitality.
`.trim()

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    areaServed: ["Costa Rica", "Hawaii", "United States", "Portugal"],
    founder: {
      "@type": "Person",
      name: "Michael Bond-Crowley",
      jobTitle: "Principal Architect",
    },
    knowsAbout: [
      "Ecological architecture",
      "Passive tropical design",
      "Post-and-beam construction",
      "Off-grid systems",
      "Wellness retreat design",
      "Eco luxury residential design",
    ],
    serviceType: [
      "Architectural design",
      "Licensed plan sets",
      "Project management",
      "Off-grid system design",
    ],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    inLanguage: ["en", "fr", "es", "pt"],
  }
}
