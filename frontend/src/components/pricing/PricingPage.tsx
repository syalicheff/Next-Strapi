"use client";

import { PricingCard } from "./PricingCard";
import { FeatureIcon } from "./FeatureIcon";
import { JumboTitle } from "../shared/display/JumboTitle";
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
  const [showMonthlyPricing, setShowMonthlyPricing] = useState(true);

  return (
    <Container fluid py="xl">
      <Container size="md">
        <Stack align="center" gap="xs">
          <JumboTitle order={2} fz="md" ta="center">
            Soutenez le Blog. Lisez Plus.
          </JumboTitle>
          <Text c="dimmed" ta="center" fz="xl">
            Accédez à des articles exclusifs et soutenez l'écriture indépendante.
          </Text>
          <Center>
            <SegmentedControl
              mt="xl"
              size="lg"
              maw={320}
              radius="xl"
              data={["Annuel (-20%)", "Mensuel"]}
              defaultValue={
                showMonthlyPricing ? "Mensuel" : "Annuel (Économisez 20%)"
              }
              onChange={() => setShowMonthlyPricing((prev) => !prev)}
            />
          </Center>
        </Stack>
      </Container>

      <Group mt="xl" justify="center" gap="xl">
        <PricingCard
          title="Lecteur Basique"
          description="Parfait pour les lecteurs occasionnels"
          price={showMonthlyPricing ? "4,99€" : "47,90€"}
          strikethroughPrice={showMonthlyPricing ? "4,99€" : "59,88€"}
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod={showMonthlyPricing ? "/mois" : "/an"}
          cta={
            <Button
              component={NextLink}
              href="/subscribe/basic"
              size="lg"
              variant="light"
              fullWidth
            >
              S'abonner
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconFileText size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "Accès aux Articles Premium",
              description: "Lisez tous les articles premium du blog",
              icon: (
                <FeatureIcon>
                  <IconBook2 size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Soutenez le Blog",
              description: "Gardez le contenu gratuit pour tous",
              icon: (
                <FeatureIcon>
                  <IconUserHeart size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Soutenez l'Écriture Indépendante",
              description: "Aidez-nous à créer plus de contenu",
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
          title="Abonné Pro"
          description="Soutenez activement et débloquez des extras"
          badge={
            <Badge variant="light" size="lg">
              Le plus populaire
            </Badge>
          }
          price={showMonthlyPricing ? "8,99€" : "86,30€"}
          strikethroughPrice={showMonthlyPricing ? "8,99€" : "107,88€"}
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod={showMonthlyPricing ? "/mois" : "/an"}
          cta={
            <Button
              component={NextLink}
              href="/subscribe/pro"
              size="lg"
              fullWidth
            >
              S'abonner
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconHeartHandshake size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "Toutes les Fonctionnalités Basiques",
              description: "Tout ce qui est inclus dans l'offre Basique",
              icon: (
                <FeatureIcon>
                  <IconFileText size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Expérience Sans Publicité",
              description: "Lisez sans distractions",
              icon: (
                <FeatureIcon>
                  <IconShieldLock size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Accès Anticipé",
              description: "Lisez les nouveaux articles avant les autres",
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
          title="Mécène Partenaire"
          description="Pour les vrais supporters de ce blog"
          badge={
            <Badge variant="outline" size="lg">
              Meilleur rapport qualité-prix
            </Badge>
          }
          price={showMonthlyPricing ? "14,99€" : "143,90€"}
          strikethroughPrice={showMonthlyPricing ? "14,99€" : "179,88€"}
          showStrikethroughPrice={!showMonthlyPricing}
          pricingPeriod={showMonthlyPricing ? "/mois" : "/an"}
          cta={
            <Button
              component={NextLink}
              href="/subscribe/patron"
              size="lg"
              variant="light"
              fullWidth
            >
              S'abonner
            </Button>
          }
          icon={
            <FeatureIcon>
              <IconBuildingCastle size={21} />
            </FeatureIcon>
          }
          items={[
            {
              title: "Toutes les Fonctionnalités Pro",
              description: "Tout ce qui est inclus dans l'offre Pro",
              icon: (
                <FeatureIcon>
                  <IconBook2 size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Accès Premium aux Commentaires",
              description: "Participez aux discussions privées",
              icon: (
                <FeatureIcon>
                  <IconUsers size={21} />
                </FeatureIcon>
              ),
            },
            {
              title: "Retour Direct",
              description: "Obtenez des insights ",
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
