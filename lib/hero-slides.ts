/** Shared hero / language-gate imagery (paths under `public`). */
export const HERO_SLIDES = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.png",
  "/images/hero4.png",
] as const

export type HeroSlideSrc = (typeof HERO_SLIDES)[number]
