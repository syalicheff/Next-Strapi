import "@/styles/globals.css";
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import NextAuthProvider from "@/components/providers/NextAuthProvider";

export const metadata = {
  title: "Frontend Strapi",
  description: "Test Frontend to try integrate Strapi with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript
          defaultColorScheme="light"
          localStorageKey="mantine-color-scheme"
          forceColorScheme="light"
        />
      </head>
      <body>
        <MantineProvider
          forceColorScheme="light"
          defaultColorScheme="light"
          theme={{ fontFamily: "Inter, sans-serif" }}
        >
          <NextAuthProvider>{children}</NextAuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
