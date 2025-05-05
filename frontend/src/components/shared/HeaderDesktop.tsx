"use client";

import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  Box,
} from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";

type Props = {
  links: { link: string; label: string }[];
  active: string;
  setActive: (value: string) => void;
};

export default function HeaderDesktop({ links, active, setActive }: Props) {
  const { data: session } = useSession();
  const user = session?.user as User | null;
  console.log("User session:", user);
  return (
    <Group gap="md" visibleFrom="xs">
      {links.map((link) => (
        <UnstyledButton
          key={link.label}
          component={Link}
          href={link.link}
          onClick={() => setActive(link.link)}
          px="md"
          py="xs"
          bg={active === link.link ? "gray.1" : "transparent"}
          fw={600}
          c={active === link.link ? "#1c7ed6" : "black"}
          size="sm"
          style={{
            borderRadius: 8,
            fontSize: rem(18),
          }}
        >
          {link.label}
        </UnstyledButton>
      ))}

      {user && (
        <Menu width={200} shadow="md" position="bottom-end" withinPortal>
          <Menu.Target>
            <UnstyledButton>
              <Group gap={7}>
                <Avatar
                  src={
                    typeof user.avatar === "string"
                      ? user.avatar
                      : user.avatar?.url || "/vercel.svg"
                  }
                  alt={user.username}
                  radius="xl"
                  size={28}
                />
                <Box>
                  <Text fw={500} size="sm">
                    {user.username}
                  </Text>
                </Box>
                <IconChevronDown size={14} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconSettings size={16} stroke={1.5} />}
              component={Link}
              href="/profile"
            >
              Mon profil
            </Menu.Item>
            <Menu.Item
              leftSection={<IconLogout size={16} stroke={1.5} />}
              onClick={() => signOut()}
            >
              Se déconnecter
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  );
}
