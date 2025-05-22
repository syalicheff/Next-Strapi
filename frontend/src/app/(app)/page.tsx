"use client";

import { HeroSection } from "@/components/home/HeroSection";

export default function page() {
  return (
    <HeroSection
      title="Strapi Next"
      description="Un template Next.js pour Strapi, prêt à l'emploi avec Strapi,NextJs NextAuth et Mantine / Motion pour l'UI."
      rating={5}
      ratingLabel="Notre équipe est composée de 10 personnes"
    />
  );
}
