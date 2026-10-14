import { type Category } from "../types/Category";
import { apiRequest } from "./client";

export function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/categories");
}

export function createCategory(
  category: Omit<Category, "id">,
): Promise<Category> {
  return apiRequest<Category>("/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
}