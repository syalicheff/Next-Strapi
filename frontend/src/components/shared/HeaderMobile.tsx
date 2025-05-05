"use client";

import {
  Drawer,
  Group,
  Image,
  Stack,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import Link from "next/link";

type Props = {
  opened: boolean;
  onClose: () => void;
  links: { link: string; label: string }[];
  active: string;
  setActive: (value: string) => void;
};

export default function HeaderMobile({
  opened,
  onClose,
  links,
  active,
  setActive,
}: Props) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      padding="md"
      size="75%"
      title={
        <Group>
          <Image
            src="/vercel.svg"
            alt="Vercel"
            height={30}
            width={90}
            style={{ filter: "brightness(0)" }}
          />
          <Title order={4} fw={700} c="black">
            Strapi Next
          </Title>
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
            href={link.link}
            onClick={() => {
              setActive(link.link);
              onClose();
            }}
            px="md"
            py="xs"
            bg={active === link.link ? "gray.1" : "transparent"}
            style={{
              borderRadius: 8,
              fontWeight: 600,
              fontSize: rem(18),
              color: active === link.link ? "#1c7ed6" : "black",
            }}
          >
            {link.label}
          </UnstyledButton>
        ))}
      </Stack>
    </Drawer>
  );
}
