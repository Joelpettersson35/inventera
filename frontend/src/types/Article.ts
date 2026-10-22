import type { Category } from "./Category";

export type Article = {
  id: string;
  name: string;
  quantity: number;
  description: string;
  category: Pick<Category, "id" | "name">
  categoryId: string;
  attributes: Record<string, unknown>;
};
