'use client';

import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Container,
  ContainerProps,
  Flex,
  Group,
  MantineBreakpoint,
  MantineRadius,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconArrowRight, IconLogout, IconUser } from '@tabler/icons-react';
import HeaderMobile from './HeaderMobile';
import { motion } from 'motion/react';
import NextLink from 'next/link';
import classes from './Header.module.css';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { useDisclosure } from '@mantine/hooks';

export type HeaderLink = {
  label: string;
  href: string;
};

const HEADER_LINKS: HeaderLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tarifs', href: '/pricing' },
];

type Props = ContainerProps & {
  logo?: React.ReactNode;
  callToActionTitle?: string;
  callToActionUrl?: string;
  radius?: MantineRadius | number;
  links?: HeaderLink[];
};

export default function HeaderTest({
  style,
  logo = (
    <Text fw="bold" fz={24} mx="xs" ta="center">
      Clutch Code
    </Text>
  ),
  callToActionTitle = 'Write blog post',
  callToActionUrl = '/blog/new',
  links = HEADER_LINKS,
  h = 60,
  radius = 30,
  ...containerProps
}: Props) {
  const { data: session } = useSession();
  const user = session?.user as User | null;
  const [opened, { toggle, close }] = useDisclosure(false);
  const breakpoint: MantineBreakpoint = 'xs';

  return (
    <>
      <Container
        className={classes.container}
        component="header"
        style={{ borderRadius: radius, ...style }}
        w={{ base: '90%', [breakpoint]: 'fit-content' }}
        h={h}
        {...containerProps}
      >
        <Flex
          justify="space-between"
          align="center"
          h="100%"
          style={{ overflow: 'hidden' }}
          gap="xs"
          wrap="nowrap"
        >
          <Flex gap={0} style={{ flexShrink: 0 }} align="center">
            <Burger size="sm" opened={opened} onClick={toggle} hiddenFrom={breakpoint} />

            <Box visibleFrom="base" hiddenFrom="sm" w={"auto"} ml={"60"}>
              {logo}
            </Box>
            <Box visibleFrom="sm">{logo}</Box>
          </Flex>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 'fit-content', opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Flex
              flex={1}
              justify="center"
              px="lg"
              h="100%"
              align="center"
              wrap="nowrap"
              visibleFrom={breakpoint}
              gap="lg"
              className={classes['link-container']}
            >
              {links.map((link: HeaderLink) => (
                <Anchor
                  key={link.href}
                  className={classes.link}
                  href={link.href}
                  component={NextLink}
                  td="none"
                >
                  {link.label}
                </Anchor>
              ))}
            </Flex>
          </motion.div>

          <Menu shadow="md" width={200} position="bottom-end" >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={7}>
                  <Avatar
                    src={
                      typeof user?.avatar === 'string'
                        ? user?.avatar
                        : user?.avatar?.url || '/vercel.svg'
                    }
                    alt={user?.username}
                    radius="xl"
                    size={45}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component={NextLink}
                href="/profile"
                leftSection={<IconUser size={14} />}
              >
                Profil
              </Menu.Item>
              <Menu.Item
                onClick={() => signOut({ callbackUrl: '/' })}
                leftSection={<IconLogout size={14} />}
                color="red"
              >
                Déconnexion
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <HeaderMobile opened={opened} onClose={close} links={links} />
    </>
  );
}
