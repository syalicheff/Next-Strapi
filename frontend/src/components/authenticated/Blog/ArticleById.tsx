"use client";

import {
  Center,
  Container,
  Flex,
  Image,
  Stack,
  Title,
  AspectRatio,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { Article } from "@/types/Article";
import MarkdownRenderer from "@/components/shared/display/MarkdownRenderer";

type Props = {
  article: Article;
};

export default function ArticleById({ article }: Props) {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  return (
    <Container size="xl" py="60" bg="white">
      {/* Image de couverture */}
      {article.image?.url && (
        <AspectRatio
          {...(isMobile ? { ratio: 1 / 1 } : { ratio: 25 / 9 })}
          w="100%"
          mx="auto"
          mb={isMobile ? "0" : "xl"}
        >
          <Image
            src={article.image.url}
            alt={article.image.alternativeText || article.title}
            fit="contain"
            radius="md"
          />
        </AspectRatio>
      )}

      {/* Titre + contenu */}
      <Center mb={isMobile ? 10 : 40}>
        <Stack gap={isMobile ? 0 : 20} maw={900} mx="auto">
          <Title
            order={2}
            size={isMobile ? 35 : 40}
            ta="center"
            fw={1000}
            c="black"
          >
            {article.title}
          </Title>

          <Flex justify="center" align="center" w="100%">
            <MarkdownRenderer content={article.content} />
          </Flex>
        </Stack>
      </Center>
      {/* Footer */}
      {article.author && (
        <Center mb={isMobile ? 10 : 40}>
          <Text size="lg" ta="center" c="dimmed">
            {` le ${new Date(article.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} par ${article.author.firstname} ${article.author.lastname}`}
          </Text>
        </Center>
      )}
    </Container>
  );
}
