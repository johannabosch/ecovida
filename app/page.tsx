import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Principles } from "@/components/principles"
import { Services } from "@/components/services"
import { FocusAreas } from "@/components/focus-areas"
import { Gallery } from "@/components/gallery"
import { Consultation } from "@/components/consultation"
import { Resources } from "@/components/resources"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Principles />
      <Services />
      <Gallery />
      <FocusAreas />
      <Consultation />
      <Resources />
      <ContactSection />
      <Footer />
    </main>
  )
}
