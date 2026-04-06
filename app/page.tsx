import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Recognition } from "@/components/recognition"
import { Principles } from "@/components/principles"
import { Services } from "@/components/services"
import { OurWork } from "@/components/our-work"
import { StudioGallery } from "@/components/studio-gallery"
import { PlanDesignsSection } from "@/components/plan-designs"
import { Consultation } from "@/components/consultation"
import { Resources } from "@/components/resources"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getFeaturedProjects } from "@/lib/get-featured-projects"
import { getPlanDesignCards } from "@/lib/get-plan-designs"
import { listSortedPublicImagePaths } from "@/lib/portfolio-images"

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const otherGalleryImages = await listSortedPublicImagePaths("other")
  const planDesigns = await getPlanDesignCards()

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Recognition />
      <Principles />
      <Services />
      <OurWork projects={featuredProjects} />
      <StudioGallery images={otherGalleryImages} />
      <PlanDesignsSection plans={planDesigns} />
      <Consultation />
      <Resources />
      <ContactSection />
      <Footer />
    </main>
  )
}
