'use client';

import {
  Paper,
  Tabs,
  Avatar,
  Text,
  Group,
  Stack,
  Title,
  Card,
  Badge,
  rem,
  Image,
  Table,
  Center,
  Box,
  ActionIcon,
  Button,
} from '@mantine/core';
import { IconArticle, IconCalendar, IconLogout, IconUser } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { type User, type Article } from '@/lib/strapi/user';
import classes from './ProfileContent.module.css';
import { signOut } from 'next-auth/react';


interface ProfileContentProps {
  user: User;
  articles: Article[];
}

export function ProfileContent({ user, articles }: ProfileContentProps) {
  const userWithoutArticles = {
    ...user,
    articles: [],
  };
  console.log(articles);
  const lastArticleDate =
    articles.length > 0
      ? new Date(articles[0].createdAt).toLocaleDateString('fr-FR')
      : 'Aucun article';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Center>
        <Paper
          className={classes.container}
          radius="md"
          withBorder
          shadow="lg"
          maw={800}
          w="100%"
        >
          <Tabs defaultValue="info">
            <Tabs.List justify="space-evenly" grow>
              <Tabs.Tab value="info" leftSection={<IconUser size={16} />} style={{ textAlign: 'center' }}>
                <Text ta="center">Informations</Text>
              </Tabs.Tab>
              <Tabs.Tab value="articles" leftSection={<IconArticle size={16} />} style={{ textAlign: 'center' }}>
                <Text ta="center">Mes Articles</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="info" p="xl">
              <Stack gap="lg">
                <Title order={1} ta="center">
                  Profil
                </Title>
                <Center>
                  <Avatar
                    src={user.avatar?.url || null}
                    size={120}
                    radius={120}
                    alt={`Avatar de ${user.firstname} ${user.lastname}`}
                  />
                </Center>
                <Center>
                  <Stack align="center" gap="xs">
                    <Title order={2}>{user.firstname} {user.lastname}</Title>
                    <Text c="dimmed">{user.username}</Text>
                    <Group mt="xs">
                      <Badge color={user.confirmed ? "green" : "red"}>
                        {user.confirmed ? "Confirmé" : "Non confirmé"}
                      </Badge>

                      {user.blocked && <Badge color="red">Bloqué</Badge>}
                      <Badge leftSection={<IconArticle size={14} />}>
                        {articles.length} {articles.length > 1 ? 'Articles' : 'Article'}
                      </Badge>
                      <Badge leftSection={<IconCalendar size={14} />}>
                        Dernier article : {lastArticleDate}
                      </Badge>
                    </Group>
                  </Stack>
                </Center>

                <Group mt="md" justify="center">
                  <Button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    radius="md"
                    variant=""
                    color="red"
                    leftSection={<IconLogout size={16} />}
                  >
                    <Text ta="center"
                      
                    >Déconnexion</Text>
                  </Button>
                </Group>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="articles" p="xl">
              <Title order={2} ta="center" mb="md">
                Mes Articles
              </Title>
              {articles.length > 0 ? (
                <Table striped highlightOnHover withColumnBorders verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w={100} ta="center">Image</Table.Th>
                      <Table.Th ta="center">Titre</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {articles
                      .filter((article) => article.locale === "fr")
                      .map((article) => (
                        <Table.Tr key={article.id}>
                          <Table.Td>
                            {article.image?.url && (
                              <Image
                                src={article.image.url}
                                alt={article.image.alternativeText || 'Image de l\'article'}
                                width={60}
                                height={60}
                                fit="cover"
                                radius="sm"
                                style={{ borderRadius: rem(6), objectFit: "cover" }}
                              />
                            )}
                          </Table.Td>
                          <Table.Td>
                            <Link href={`/blog/${article.documentId}`}>
                              <Text fw={500}>{article.title}</Text>
                            </Link>
                            <Text size="sm" c="dimmed" lineClamp={2}>
                              {article.content}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                  </Table.Tbody>
                </Table>
              ) : (
                <Text c="dimmed" ta="center">
                  Aucun article disponible.
                </Text>
              )}
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Center>
    </motion.div>
  );
}
