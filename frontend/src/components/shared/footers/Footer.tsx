'use client';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
 
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import classes from './Footer.module.css';

 
 

type SocialLinkItem = {
  icon: ReactNode;
  href: string;
};

type FooterProps = {
  logo?: ReactNode;
  companyDescription?: ReactNode;
  socialTitle?: string;
  socialLinks?: SocialLinkItem[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterSubmitButtonText?: string;
  copyrightText?: string;
  privacyPolicyText?: string;
  privacyPolicyUrl?: string;
  termsOfServiceText?: string;
  termsOfServiceUrl?: string;
};

export default function Footer({
  newsletterTitle = 'Inscrivez-vous à notre newsletter',
  newsletterDescription = 'Abonnez-vous à notre newsletter pour recevoir les dernières actualités et mises à jour.',
  newsletterSubmitButtonText = 'S’abonner',
  copyrightText = '© 2024 ClutchCode, Inc. Tous droits réservés.',
  privacyPolicyText = 'Politique de confidentialité',
  privacyPolicyUrl = '#',
  termsOfServiceText = 'Conditions d’utilisation',
  termsOfServiceUrl = '#',
}: FooterProps = {}) {
  return (
    <Container component="footer" className={classes.container} fluid mt="xl">
      <Container
        size="xl"
        px={0}
        py={{
          base: 'xl',
          sm: 'calc(var(--mantine-spacing-xl) * 1.2)',
        }}
      >
        <Flex justify="space-between" wrap="wrap" gap="lg">
          <Stack gap={4}>
            <Text size="xl" fw="bold">
              {newsletterTitle}
            </Text>
            <Text size="sm" c="dimmed" style={{ textWrap: 'balance' }} maw={300}>
              {newsletterDescription}
            </Text>
          </Stack>
          <Flex justify="end" align="start" maw={400} flex={1} miw={300}>
            <TextInput
              flex={1}
              placeholder="Adresse e-mail"
              size="lg"
              inputMode="email"
              type="email"
              autoComplete="email"
              classNames={{ input: classes.input }}
              rightSectionWidth={110}
              rightSection={
                <Button className={classes.button} size="xs" radius="sm">
                  {newsletterSubmitButtonText}
                </Button>
              }
            />
          </Flex>
        </Flex>
        <Divider mt="xl" mb="lg" />
        <Flex justify="space-between" align="start" wrap="wrap" gap="lg">
          <Text size="xs" c="dimmed">
            {copyrightText}
          </Text>
          <Group gap="xl">
            <Anchor component={NextLink} href={privacyPolicyUrl} underline="never" c="dimmed" fz="xs">
              {privacyPolicyText}
            </Anchor>
            <Anchor
              component={NextLink}
              href={termsOfServiceUrl}
              underline="never"
              c="dimmed"
              fz="xs"
            >
              {termsOfServiceText}
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </Container>
  );
}

 

 
 
