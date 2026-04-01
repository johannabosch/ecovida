import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Principles } from "@/components/principles"
import { Gallery } from "@/components/gallery"
import { Services } from "@/components/services"
import { Consultation } from "@/components/consultation"
import { Resources } from "@/components/resources"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Principles />
      <Gallery />
      <Services />
      <Consultation />
      <Resources />
      <Footer />
    </main>
  )
}
