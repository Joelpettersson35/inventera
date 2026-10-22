import type { Article } from "../types/Article";
import { apiRequest } from "./client";

// Backend skapar artikelns id. Därför struntar vi i att skicka det
export type CreateArticleInput = Omit<Article, "id" | "category">;

export function createArticle(
  article: CreateArticleInput,
): Promise<Article> {
  return apiRequest<Article>("/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
}

export function getArticles(
): Promise<Article[]> {
  return apiRequest<Article[]>("/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}