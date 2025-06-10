import { getArticles } from "@/lib/strapi/articles";
import { Button, Center, Container, Flex, Title, Text } from "@mantine/core";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Article } from "@/types/Article";
import ArticlesList from "@/components/authenticated/Blog/ArticlesList";
import Link from "next/link";
import { JumboTitle } from "@/components/shared/display/JumboTitle";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const posts = (await getArticles("fr", user)) as Article[];
  
  return (
    <Container size="xl"  >
      <Center mb={40}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap={"md"}
          w="100%"
        >
          <JumboTitle order={2} fz="md" ta="center">
            Blog
          </JumboTitle>
        </Flex>
      </Center>
      <ArticlesList articles={posts} user={user} />
    </Container>
  );
}
