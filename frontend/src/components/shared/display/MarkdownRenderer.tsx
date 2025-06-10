"use client";

import ReactMarkdown from "react-markdown";
import { Title, List, ListItem, Box, Container, Table } from "@mantine/core";
import remarkGfm from "remark-gfm";
import styles from "./MarkdownRenderer.module.css";
import { useViewportSize } from "@mantine/hooks";

type Props = {
  content: string;
  clamp?: boolean;
};

export default function MarkdownRenderer({ content, clamp = false }: Props) {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  return (
    <Container
      className={`${styles.markdown} ${clamp ? styles.clamped : ""}`}
      p="4"
      fluid
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Title order={2} ta="center">
              {children}
            </Title>
          ),
          h2: ({ children }) => <Title order={3}>{children}</Title>,
          h3: ({ children }) => <Title order={4}>{children}</Title>,
          p: ({ children }) => <Box mb="sm">{children}</Box>,
          ul: ({ children }) => <List withPadding>{children}</List>,
          li: ({ children }) => <ListItem>{children}</ListItem>,
          blockquote: ({ children }) => (
            <Box component="blockquote">{children}</Box>
          ),
          strong: ({ children }) => (
            <span style={{ fontWeight: "bold" }}>{children}</span>
          ),
          em: ({ children }) => (
            <span style={{ fontStyle: "italic" }}>{children}</span>
          ),
          table: ({ children }) => (
            <Table striped highlightOnHover>
              {children}
            </Table>
          ),
          th: ({ children }) => <Table.Th>{children}</Table.Th>,
          td: ({ children }) => <Table.Td>{children}</Table.Td>,
          tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
          thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
          tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
          tfoot: ({ children }) => <Table.Tfoot>{children}</Table.Tfoot>,

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: isMobile ? "100%" : "50%",
                margin: "0 auto",
                display: "block",
              }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
}
