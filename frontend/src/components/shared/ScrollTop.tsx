"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll au changement de page (navigation client)
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Scroll au chargement initial
    window.scrollTo(0, 0);
  }, []);

  return null;
}
