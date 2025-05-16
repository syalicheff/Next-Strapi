"use server";
import { getArticleById } from "@/lib/strapi/articles";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ArticleById from "@/components/authenticated/Blog/ArticleById";
import { Title, Center, Container } from "@mantine/core";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const post = await getArticleById(id, session?.user || null);

  if (!post) {
    return (
      <Container >
        <Center mb={40}>
          <Title order={1} size={60} ta="center" fw={800} c="black">
            L'article n'existe pas
          </Title>
        </Center>
      </Container>
    );
  }

  return <ArticleById article={post} />;
}
