"use server";

import { strapiClient } from "./strapiClient";
import { User } from "next-auth";
import { Article } from "@/types/Article";

export type { User, Article };

type UserWithArticles = User & {
  articles: Article[];
};

export async function getMeAndMyArticles(user: User): Promise<{
  user: UserWithArticles;
  articles: Article[];
}> {
  try {
    const client = await strapiClient({ user });

    const response = await client.get("/users/me", {
      params: {
        populate: {
          avatar: { fields: ["url", "alternativeText"] },
          articles: {
            populate: {
              image: { fields: ["url", "alternativeText", "caption"] },
              author: {
                fields: ["id", "username", "email", "firstname", "lastname"],
                populate: {
                  avatar: { fields: ["url", "alternativeText"] },
                },
              },
            },
          },
        },
      },
    });

    const me = response.data as UserWithArticles;

    // Fix image URLs
    if (me.avatar) {
      me.avatar.url = `${process.env.STRAPI_URL}${me.avatar.url}`;
    }

    const articles = (me.articles || []).map((article) => {
      if (article.image) {
        article.image.url = `${process.env.STRAPI_URL}${article.image.url}`;
      }
      if (article.author?.avatar) {
        article.author.avatar.url = `${process.env.STRAPI_URL}${article.author.avatar.url}`;
      }
      return article;
    });

    return { user: me, articles };
  } catch (error: any) {
    console.error("Error fetching user and articles:", error);
    throw error;
  }
}
