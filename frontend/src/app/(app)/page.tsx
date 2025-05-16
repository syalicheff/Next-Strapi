
"use client";


import { HeroSection } from "@/components/home/HeroSection";

export default function page() {
  return (
     <HeroSection
        title="Bienvenue sur notre site"
        description="Nous sommes une entreprise qui produit des produits de qualité"
        rating={5}
        ratingLabel="Notre équipe est composée de 10 personnes"
     />

  );
}
