"use client";

import { Article } from "@/types/Article";
import { SimpleGrid, Button, Stack } from "@mantine/core";
import ArticleCard from "./ArticleCard";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  articles: Article[];
  pageSize?: number;
  user: any;
};

export default function ArticlesList({ articles, pageSize = 6, user }: Props) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <Stack mt="xl" align="center">
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 50, sm: 80 }}
          verticalSpacing="xl"
        >
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
            >
              <ArticleCard article={article} user={user} />
            </motion.div>
          ))}
        </SimpleGrid>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        )}
      </Stack>
    </motion.div>
  );
}
