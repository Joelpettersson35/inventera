import { useContext } from "react";
import { ArticlesContext } from "../context/ArticlesContext";

export default function useArticles() {
  const context = useContext(ArticlesContext);

  if (context === undefined) {
    throw new Error(
      "useArticles måste användas inom ArticlesProvider.",
    );
  }

  return context;
}