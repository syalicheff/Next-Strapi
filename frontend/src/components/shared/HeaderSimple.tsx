"use client";

import { useState } from "react";
import {
  Box,
  Burger,
  Container,
  Group,
  Image,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const links = [
  { link: "/", label: "Accueil" },
  { link: "/blog", label: "Blog" },
  { link: "/profile", label: "Profil" },
];

export default function HeaderSimple() {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(pathname || links[0].link);

  return (
    <>
      <Box component="header" bg="white">
        <Container
          size="xl"
          p="40"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: rem(100),
          }}
        >
          <Group>
            <Image
              src="/vercel.svg"
              alt="Vercel"
              height={40}
              width={120}
              style={{ filter: "brightness(0)" }}
            />
            <Title fw={800} c="black">
              Strapi Next
            </Title>
          </Group>

          <HeaderDesktop links={links} active={active} setActive={setActive} />

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="md" />
        </Container>
      </Box>

      <HeaderMobile
        opened={opened}
        onClose={close}
        links={links}
        active={active}
        setActive={setActive}
      />
    </>
  );
}
