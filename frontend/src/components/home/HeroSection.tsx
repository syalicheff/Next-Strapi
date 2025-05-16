import { JumboTitle } from '@/components/shared/JumboTitle';
  

import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Container,
  ContainerProps,
  Flex,
  Image,
  Rating,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
import NextImage from 'next/image';
import classes from './HeroSection.module.css';

type ImageItem = { src: string; alt: string };

type HeroSectionProps = ContainerProps & {
  avatarItems?: ImageItem[];
  badge?: string;
  title?: string;
  description?: string;
  rating?: number;
  ratingLabel?: string;
};

export const HeroSection = ({
  badge = 'Build faster with AI-powered tools',
  title = 'Accelerate Your Development Workflow',
  description = 'Access cutting-edge developer tools and APIs. Build, deploy, and scale applications with enterprise-grade reliability.',
  rating = 5,
  ratingLabel = 'Trusted by 100k+ developers',
  avatarItems = AVATAR_ITEMS_DEMO,
  ...containerProps
}: HeroSectionProps) => (
  <Container pos="relative" h="100vh" mah={950} style={{ overflow: 'hidden' }} fluid>
    <Container component="section" h="100vh" mah={950} mx="auto" size="xl" {...containerProps}>


      <Box
        pos="absolute"
        top={40}
        left={0}
        h="100%"
        w="100%"
        className={classes['vertical-backdrop']}
      />
      <Flex h="100%" align="center" pos="relative" justify="center">
        <Stack
          pt={{ base: 'xl', sm: 0 }}
          maw="var(--mantine-breakpoint-md)"
          align="center"
          gap="lg"
          style={{ zIndex: 1 }}
        >
  
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <JumboTitle ta="center" order={1} fz="lg" style={{ textWrap: 'balance' }}>
              {title}
            </JumboTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Text
              ta="center"
              maw="var(--mantine-breakpoint-xs)"
              fz="xl"
              style={{ textWrap: 'balance' }}
            >
              {description}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <TextInput
              w={400}
              px="md"
              my="lg"
              maw="100vw"
              placeholder="Email address"
              size="xl"
              radius="xl"
              inputMode="email"
              type="email"
              autoComplete="email"
              rightSection={
                <ActionIcon className={classes['cta-icon']} radius="xl" size="lg">
                  <IconArrowRight />
                </ActionIcon>
              }
              classNames={{ input: classes.input }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Stack align="center" mt="md">
              <AvatarGroup>
                {avatarItems.map((avatarItem, index) => (
                  <Avatar key={index} src={avatarItem.src} className={classes.avatar} />
                ))}
              </AvatarGroup>
              <Stack align="center" gap={4}>
                {rating && <Rating color="var(--mantine-color-text)" value={rating} />}
                {ratingLabel && (
                  <Text ta="center" fz="sm" c="dimmed">
                    {ratingLabel}
                  </Text>
                )}
              </Stack>
            </Stack>
          </motion.div>
        </Stack>
      </Flex>
    </Container>
  </Container>
);

const AVATAR_ITEMS_DEMO: ImageItem[] = [
  {
    src: 'https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1645857195444-2064b4ecabf3?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1707672972137-64390186af62?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: '',
  },
];