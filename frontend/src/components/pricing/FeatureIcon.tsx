"use client";

import { Card, Center } from "@mantine/core";
import { ReactNode } from "react";

export const FeatureIcon = ({ children }: { children: ReactNode }) => (
  <Card radius="xl" p="sm" withBorder>
    <Center>{children}</Center>
  </Card>
);
