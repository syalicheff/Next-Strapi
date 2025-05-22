"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  CardProps,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { JumboTitle } from "../shared/JumboTitle";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

type Props = {
  badge?: ReactNode;
  cta: ReactNode;
  description: string;
  icon: ReactNode;
  items: Feature[];
  price: string;
  pricingPeriod: string;
  shadow?: CardProps["shadow"];
  strikethroughPrice?: string;
  showStrikethroughPrice?: boolean;
  title: string;
  delay?: number;
};

export const PricingCard = ({
  badge,
  cta,
  description,
  icon,
  items,
  price,
  pricingPeriod,
  shadow,
  strikethroughPrice,
  showStrikethroughPrice = true,
  title,
  delay = 0,
}: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card
      radius="lg"
      shadow={shadow}
      miw={{ base: "100%", sm: 350 }}
      maw={380}
      withBorder
    >
      <Group justify="space-between" align="start" mb="md">
        <Box>{icon}</Box>
        <Box>{badge}</Box>
      </Group>

      <Text fz="xl" fw="bold">
        {title}
      </Text>
      <Text mb="md" c="dimmed">
        {description}
      </Text>

      <Text
        c="dimmed"
        fz="lg"
        td="line-through"
        span
        style={{ visibility: showStrikethroughPrice ? "visible" : "hidden" }}
      >
        {strikethroughPrice}
      </Text>

      <Flex align="end" gap="xs">
        <JumboTitle my={0} order={2} fz="md" mb="sm">
          {price}
        </JumboTitle>
        <Text c="dimmed" span>
          {pricingPeriod}
        </Text>
      </Flex>

      <Card.Section my="lg">
        <Divider />
      </Card.Section>

      <Stack>
        {items.map((item) => (
          <Group key={item.title} gap="xs">
            <Box>{item.icon}</Box>
            <Stack gap={0}>
              <Text fw={500}>{item.title}</Text>
              <Text c="dimmed" fz="sm">
                {item.description}
              </Text>
            </Stack>
          </Group>
        ))}
      </Stack>

      <Card.Section my="lg">
        <Divider />
      </Card.Section>

      <Box>{cta}</Box>
    </Card>
  </motion.div>
);
