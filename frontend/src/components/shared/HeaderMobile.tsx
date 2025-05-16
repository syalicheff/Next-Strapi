"use client";

import {
  Drawer,
  Group,
  Image,
  Stack,
  UnstyledButton,
  rem,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { HeaderLink } from "./Header";

type Props = {
  opened: boolean;
  onClose: () => void;
  links: HeaderLink[];
 
};

export default function HeaderMobile({
  opened,
  onClose,
  links,
 
}: Props) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      padding="md"
      size="75%"
      title={
        <Group align="center" gap="xs">
          <Image
            src="/vercel.svg"
            alt="Vercel"
            maw={80} // largeur max
            h="auto" // garde le ratio
            fit="contain" // ne crop pas
            style={{ filter: "brightness(0)" }}
          />
          <Text fw={700} size="lg" c="black">
            Strapi Next
          </Text>
        </Group>
      }
      hiddenFrom="xs"
      withCloseButton
    >
      <Stack mt="md" gap="md">
        {links.map((link) => (
          <UnstyledButton
            key={link.label}
            component={Link}
            href={link.href}
             
            px="md"
            py="xs"
             style={{
              borderRadius: 8,
              fontWeight: 600,
              fontSize: rem(18),
             }}
          >
            {link.label}
          </UnstyledButton>
        ))}
      </Stack>
    </Drawer>
  );
}
