"use server";
import { Article } from "@/types/Article";
import { strapiClient } from "./strapiClient";
import { User } from "next-auth";
import { cookies } from "next/headers";

export async function getArticles(
  locale: string,
  user: User
): Promise<Article[]> {
  try {
    const client = await strapiClient({ user });
    const response = await client.get("/articles", {
      params: {
        locale,
        populate: {
          image: {
            fields: ["url", "alternativeText", "caption"],
          },
          localizations: {
            fields: ["id", "locale", "title", "content"],
          },
          author: {
            fields: ["id", "username", "email", "firstname", "lastname"],
            populate: {
              avatar: {
                fields: ["url"],
              },
            },
          },
        },
      },
    });

    const articles = response.data.data as Article[];
    articles.forEach((article) => {
      if (article.image) {
        article.image.url = `${process.env.STRAPI_URL}${article.image.url}`;
      }
      if (article.author && article.author.avatar) {
        article.author.avatar.url = `${process.env.STRAPI_URL}${article.author.avatar.url}`;
      }
    });
    console.log(JSON.stringify(articles, null, 2));
    return articles;
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    console.log("Error details:", error.response?.data || error.message);
    return [];
  }
}
