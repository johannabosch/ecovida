import {
  organizationJsonLd,
  SEO_HIDDEN_COPY,
  websiteJsonLd,
} from "@/lib/seo"

export function SeoContent() {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <aside className="sr-only" aria-label="About Eco-Vida Designs">
        <h2>Eco-Vida Designs — Ecological Architecture &amp; Eco Luxury Design</h2>
        <p>{SEO_HIDDEN_COPY}</p>
      </aside>
    </>
  )
}
