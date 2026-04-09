"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  /** Use on above-the-fold header logo for faster LCP */
  priority?: boolean
}

export function SiteLogo({ className, priority }: SiteLogoProps) {
  return (
    <Image
      src="/logo-header.png"
      alt="Eco-Vida Designs. Ecological architecture, luxury eco homes and retreats. Work in Costa Rica, Hawaii, the United States, and Portugal."
      width={400}
      height={120}
      className={cn("h-8 w-auto md:h-10", className)}
      priority={priority}
    />
  )
}
