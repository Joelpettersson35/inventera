import type { Article, ArticleDetails } from "../types/Article";
import { apiRequest } from "./client";
import { type CreateArticleInput } from "../types/Article";

export function createArticle(article: CreateArticleInput): Promise<Article> {
  return apiRequest<Article>("/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
}

export function getArticles(): Promise<Article[]> {
  return apiRequest<Article[]>("/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getArticle(articleId: string): Promise<ArticleDetails> {
  return apiRequest<ArticleDetails>(`/article/${articleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
