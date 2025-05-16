import { getArticles } from "@/lib/strapi/articles";
import { Button, Center, Container, Flex, Title, Text } from "@mantine/core";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Article } from "@/types/Article";
import ArticlesList from "@/components/authenticated/Blog/ArticlesList";
import Link from "next/link";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const posts = (await getArticles("fr", user)) as Article[];

  return (
    <Container size="xl"  >
      <Center mb={40}>
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          gap={"xl"}
          w="100%"
        >
          <Title order={1} size={60} ta="center" fw={800} c="black">
            Blog
          </Title>
          <Button
            component={Link}
            href="/blog/new"
            color="violet"
            radius="md"
            size="sm"
          >
            Rédiger un article{" "}
            <Text ml="sm" size="xl">
              ✍️
            </Text>
          </Button>
        </Flex>
      </Center>

      <ArticlesList articles={posts} user={user} />
    </Container>
  );
}
