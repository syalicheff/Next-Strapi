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
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { Article } from "@/types/Article";
import { deleteArticle } from "@/lib/strapi/articles";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";

type Props = {
  article: Article;
  user: any;
};

export default function ArticleCard({ article, user }: Props) {
  const { id, documentId, title, content, createdAt, image, author } = article;

  const handleDeleteArticle = async (documentId: string) => {
    try {
      await deleteArticle(documentId, user);
      notifications.show({
        title: "Article supprimé",
        message: "L'article a été supprimé avec succès.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Erreur",
        message: "Une erreur est survenue lors de la suppression de l'article.",
        color: "red",
      });
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

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
  const isAuthor = user?.id === author?.id;

  return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }}
      >
      <Card
        component={Link}
        href={`/blog/${documentId}`}
        shadow="md"
        radius="lg"
        withBorder
        maw={400}
        h="100%"
      >
        {/* Image */}
        <Card.Section pos="relative">
          <Image
            src={image?.url ? image.url : "/placeholder.jpg"}
            alt={title}
            height={200}
            fit="cover"
          />

          {/* Bouton poubelle */}
          {isAuthor && (
            <ActionIcon
              variant="transparent"
              color="red"
              radius="xl"
              size="lg"
              top={rem(10)}
              left={rem(10)}
              style={{
                position: "absolute",
                zIndex: 2,
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteArticle(article.documentId);
              }}
              bg="white"
            >
              <IconTrash size={24} />
            </ActionIcon>
          )}
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
        <Stack gap="md" p="0" mt="4">
          <Title order={3} size="h4" fw={700} ta="center">
            {title}
          </Title>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {formattedDate}
            </Text>

            {author?.username ? (
              <Text size="xs" c="dimmed" fs="italic">
                {`par ${author.firstname} ${author.lastname}`}
              </Text>
            ) : (
              <Text size="xs" c="dimmed" fs="italic">
                {`Auteur anonyme`}
              </Text>
            )}
          </Group>

          <Text lineClamp={2} size="sm" c="dimmed">
            {content?.replace(/<[^>]+>/g, "").replace(/[^a-zA-Z0-9\s]/g, "")}
          </Text>
        </Stack>
      </Card>
    </motion.div>
  );
}
