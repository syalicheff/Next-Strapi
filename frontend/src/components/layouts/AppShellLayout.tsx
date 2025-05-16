"use client";

import {
  AppShell,
  Box,
  Burger,
  Container,
  Group,
  Image,
  NavLink,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HeaderSimple from "@/components/shared/HeaderSimple";
import HeaderTest from "@/components/shared/Header";
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/products" },
  { label: "Profil", href: "/profile" },
];

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell withBorder={false}>
      {/* HEADER */}
 

      {/* MAIN */}
      <AppShell.Main>
        <HeaderTest mt={"xl"} mb={"xl"} />
        <Container mt="xl" size="xl">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
