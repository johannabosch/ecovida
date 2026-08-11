/** Shared hero / language-gate imagery (paths under `public`). */
export const HERO_SLIDES = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpeg",
  "/images/hero7.jpeg",
] as const

export type HeroSlideSrc = (typeof HERO_SLIDES)[number]
