"use client";

import {
  Container,
  Stack,
  Group,
  Button,
  Text,
  Code,
  Anchor,
  Image as MantineImage,
} from "@mantine/core";
import Image from "next/image";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  console.log("User session:", user);
  return <Container size="lg" py="xl"></Container>;
}
