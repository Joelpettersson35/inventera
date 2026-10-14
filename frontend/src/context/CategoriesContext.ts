import { createContext } from "react";
import type { Category } from "../types/Category";

type CategoriesContextValue = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => void;
};

export const CategoriesContext =
  createContext<CategoriesContextValue | undefined>(undefined);