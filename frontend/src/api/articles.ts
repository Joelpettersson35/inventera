import type { Article } from "../types/Article";
import { apiRequest } from "./client";

// Backend skapar artikelns id.
export type CreateArticleInput = Omit<Article, "id">;

export function createArticle(
  article: CreateArticleInput,
): Promise<Article> {
  return apiRequest<Article>("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
}