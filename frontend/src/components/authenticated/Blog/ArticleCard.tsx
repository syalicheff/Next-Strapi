"use client";

import {
  Card,
  Image,
  Text,
  Title,
  Group,
  Avatar,
  rem,
  Stack,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { Article } from "@/types/Article";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const { id, title, content, createdAt, image, author } = article;

  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getColorFromFirstName = (name: string) => {
    const colors = ["red", "blue", "green", "orange", "purple", "pink"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const color = getColorFromFirstName(author?.firstname || "default");

  return (
    <Card
      component={Link}
      href={`/blog/${id}`}
      shadow="md"
      radius="lg"
      withBorder
      padding="lg"
      maw={400}
    >
      {/* Image */}
      <Card.Section>
        <Image
          src={image?.url ? image.url : "/placeholder.jpg"}
          alt={title}
          height={200}
          fit="cover"
        />
      </Card.Section>

      {/* Avatar en position absolue entre image et contenu */}
      {author && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: rem(-35),
            marginBottom: rem(10),
          }}
        >
          <Avatar
            src={author.avatar?.url || undefined}
            color={author?.avatar?.url ? undefined : color}
            alt={author.username}
            radius="100%"
            size={70}
            style={{
              backgroundColor: author?.avatar?.url ? undefined : color,
            }}
          >
            {!author.avatar?.url && author.firstname && (
              <Text size="sm" c="white">
                {author.firstname.charAt(0).toUpperCase()}
                {author.lastname.charAt(0).toUpperCase()}
              </Text>
            )}
          </Avatar>
        </Box>
      )}

      {/* Contenu */}
      <Stack gap="md">
        <Title order={3} size="h4" fw={700}>
          {title}
        </Title>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {formattedDate}
          </Text>

          {author?.username && (
            <Text size="xs" c="dimmed" fs="italic">
              {author.username}
            </Text>
          )}
        </Group>

        <Text size="sm" c="gray.7" lineClamp={2}>
          {content}
        </Text>
      </Stack>
    </Card>
  );
}
