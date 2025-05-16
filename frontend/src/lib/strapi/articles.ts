"use server";

import { Article } from "@/types/Article";
import { strapiClient } from "./strapiClient";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";

// 🔹 Get all articles (localized)
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
          image: { fields: ["url", "alternativeText", "caption"] },
          localizations: { fields: ["id", "locale", "title", "content"] },
          author: {
            fields: ["id", "username", "email", "firstname", "lastname"],
            populate: { avatar: { fields: ["url"] } },
          },
        },
      },
    });

    const articles = response.data.data as Article[];
    articles.forEach((article) => {
      if (article.image) {
        article.image.url = `${process.env.STRAPI_URL}${article.image.url}`;
      }
      if (article.author?.avatar) {
        article.author.avatar.url = `${process.env.STRAPI_URL}${article.author.avatar.url}`;
      }
    });
    return articles?.sort((actual, next) => {
      const dateA = new Date(actual.createdAt);
      const dateB = new Date(next.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// 🔹 Get one article by ID
export async function getArticleById(
  id: string,
  user: User
): Promise<Article | null> {
  try {
    const client = await strapiClient({ user });
    const response = await client.get(`/articles/${id}`, {
      params: {
        populate: {
          image: { fields: ["url", "alternativeText", "caption"] },
          author: {
            fields: ["id", "username", "email", "firstname", "lastname"],
            populate: { avatar: { fields: ["url"] } },
          },
        },
      },
    });

    const article = response.data.data as Article;
    if (article.image) {
      article.image.url = `${process.env.STRAPI_URL}${article.image.url}`;
    }
    if (article.author?.avatar) {
      article.author.avatar.url = `${process.env.STRAPI_URL}${article.author.avatar.url}`;
    }

    return article;
  } catch (error: any) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// 🔹 Create an article
export async function createArticle(data: any, user: User) {
  try {
    const client = await strapiClient({ user });
    const response = await client.post("/articles", { data });
    revalidatePath("/blog");
    return response.data.data;
  } catch (error: any) {
    console.error("Error creating article:", error);
    throw error;
  }
}

// 🔹 Update an article
export async function updateArticle(id: string, data: any, user: User) {
  try {
    const client = await strapiClient({ user });
    const response = await client.put(`/articles/${id}`, { data });
    revalidatePath("/blog");
    revalidatePath(`/blog/${id}`);

    return response.data.data;
  } catch (error: any) {
    console.error("Error updating article:", error);
    throw error;
  }
}

// 🔹 Delete an article
export async function deleteArticle(id: string, user: User) {
  try {
    const client = await strapiClient({ user });
    const response = await client.delete(`/articles/${id}`);
    revalidatePath("/blog");
    revalidatePath(`/blog/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting article:", error);
    throw error;
  }
}
