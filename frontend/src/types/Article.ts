import type { Category } from "./Category";

export type Article = {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  description: string;
};
