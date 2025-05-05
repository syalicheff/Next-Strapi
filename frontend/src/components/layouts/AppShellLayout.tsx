"use client";

import {
  AppShell,
  Box,
  Burger,
  Group,
  Image,
  NavLink,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HeaderSimple from "@/components/shared/HeaderSimple";

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
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      withBorder={false}
    >
      {/* HEADER */}
      <AppShell.Header>
        <HeaderSimple />
      </AppShell.Header>

      {/* NAVBAR */}

      {/* MAIN */}
      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
