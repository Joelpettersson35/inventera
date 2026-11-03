import type { Article } from "../types/Article";
import type { BoxType } from "../types/BoxType";
import { apiRequest } from "./client";

export type CreateBoxInput = {
  name: string;
  shelfId: string;
};

export type BoxArticleType = {
  boxId: string;
  articleId: string;
  quantity: number;
  article: Article;
};

export type BoxDetails = BoxType & {
  articles: BoxArticleType[];
};

export async function createBox(input: CreateBoxInput): Promise<BoxType> {
  return apiRequest("/box", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

export async function getBox(id: string): Promise<BoxDetails> {
  return apiRequest(`/box/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}
