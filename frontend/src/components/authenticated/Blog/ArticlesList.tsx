"use client";

import { Article } from "@/types/Article";
import { SimpleGrid, Button, Stack, UnstyledButton } from "@mantine/core";
import ArticleCard from "./ArticleCard";
import { useState } from "react";

type Props = {
  articles: Article[];
  pageSize?: number;
};

export default function ArticlesList({ articles, pageSize = 3 }: Props) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <Stack mt="xl" align="center">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 50, sm: 80 }}
        verticalSpacing="xl"
      >
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </SimpleGrid>

      {hasMore && (
        <Button
          onClick={handleShowMore}
          variant="outline"
          color="dark"
          size="md"
          mt="xl"
          radius="md"
        >
          Charger plus d'articles
        </Button>
      )}
    </Stack>
  );
}
