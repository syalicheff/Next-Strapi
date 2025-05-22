"use client";

import { PricingCard } from "./PricingCard";
import { FeatureIcon } from "./FeatureIcon";
import { JumboTitle } from "../shared/JumboTitle";
import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBook2,
  IconBuildingCastle,
  IconDeviceAnalytics,
  IconFileText,
  IconFingerprint,
  IconHeartHandshake,
  IconShieldLock,
  IconUserHeart,
  IconUsers,
} from "@tabler/icons-react";
import NextLink from "next/link";
import { useState } from "react";

export const PricingPage = () => {
  const [showMonthlyPricing, setShowMonthlyPricing] = useState(false);

  return (
    <Container fluid py="xl">
      <Container size="md">
        <Stack align="center" gap="xs">
          <JumboTitle order={2} fz="md" ta="center">
            Support the Blog. Read More.
          </JumboTitle>
          <Text c="dimmed" ta="center" fz="xl">
            Get access to exclusive articles and support independent writing.
          </Text>
          <Center>
            <SegmentedControl
              mt="xl"
              size="lg"
              maw={320}
              radius="xl"
              data={["Monthly", "Annual (Save 20%)"]}
              defaultValue={
                showMonthlyPricing ? "Monthly" : "Annual (Save 20%)"
              }
              onChange={() => setShowMonthlyPricing((prev) => !prev)}
            />
          </Center>
        </Stack>
      </Container>

      <Group mt="xl" justify="center" gap="xl">
        <PricingCard
          title="Basic Reader"
          description="Perfect for casual readers"
          price={showMonthlyPricing ? "$5" : "$4"}
          strikethroughPrice="$5"
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod="/month"
          cta={
            <Button
              component={NextLink}
              href="/subscribe/basic"
              size="lg"
              variant="light"
              fullWidth
            >
              Subscribe
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconFileText size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "Access Paid Articles",
              description: "Read all premium blog posts",
              icon: (
                <FeatureIcon>
                  <IconBook2 size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Support the Blog",
              description: "Keep content free for others",
              icon: (
                <FeatureIcon>
                  <IconUserHeart size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Support Independent Writing",
              description: "Help us create more content",
              icon: (
                <FeatureIcon>
                  <IconUsers size={21} />
                </FeatureIcon>
              ),
            },
          ]}
          delay={0.1}
        />

        <PricingCard
          title="Pro Subscriber"
          description="Support deeply and unlock extras"
          badge={
            <Badge variant="light" size="lg">
              Most popular
            </Badge>
          }
          price={showMonthlyPricing ? "$9" : "$7"}
          strikethroughPrice="$9"
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod="/month"
          cta={
            <Button
              component={NextLink}
              href="/subscribe/pro"
              size="lg"
              fullWidth
            >
              Subscribe
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconHeartHandshake size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "All Basic Features",
              description: "Everything from the Basic tier",
              icon: (
                <FeatureIcon>
                  <IconFileText size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Ad-Free Experience",
              description: "Read without distractions",
              icon: (
                <FeatureIcon>
                  <IconShieldLock size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Early Access",
              description: "Read new articles before others",
              icon: (
                <FeatureIcon>
                  <IconDeviceAnalytics size={21} />
                </FeatureIcon>
              ),
            },
          ]}
          delay={0.2}
        />

        <PricingCard
          title="Partner Patron"
          description="For true supporters of this blog"
          badge={
            <Badge variant="outline" size="lg">
              Best value
            </Badge>
          }
          price={showMonthlyPricing ? "$15" : "$12"}
          strikethroughPrice="$15"
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod="/month"
          cta={
            <Button
              component={NextLink}
              href="/subscribe/patron"
              size="lg"
              variant="light"
              fullWidth
            >
              Subscribe
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconBuildingCastle size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "All Pro Features",
              description: "Everything from the Pro tier",
              icon: (
                <FeatureIcon>
                  <IconBook2 size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Premium Comment Access",
              description: "Participate in private discussions",
              icon: (
                <FeatureIcon>
                  <IconUsers size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Direct Feedback",
              description: "Request articles or get insights",
              icon: (
                <FeatureIcon>
                  <IconFingerprint size={21} />
                </FeatureIcon>
              ),
            },
          ]}
          delay={0.3}
        />
      </Group>
    </Container>
  );
};
