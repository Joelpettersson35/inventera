import { type Article } from "../types/Article";
import { createContext } from "react";

type ArticlesContextValue = {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  refreshArticles: () => void;
};

export const ArticlesContext =
  createContext<ArticlesContextValue | undefined>(undefined);