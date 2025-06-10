"use client";

import {
  AppShell,
  Container,
 
} from "@mantine/core";
 
import HeaderTest from "@/components/shared/headers/Header";
import Footer  from "../shared/footers/Footer";
  

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
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
