import { getArticles } from "@/lib/strapi/articles";
import { Container, Flex, Title } from "@mantine/core";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Article } from "@/types/Article";
import ArticlesList from "@/components/authenticated/Blog/ArticlesList";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const posts = (await getArticles("fr", user)) as Article[];

  return (
    <Container size="xl" py="60">
      <Flex direction="column" align="center">
        <Title order={1} size={60} ta="center" mb={40} fw={800} c="black">
          Blog
        </Title>
      </Flex>

      <ArticlesList articles={posts} />
    </Container>
  );
}
