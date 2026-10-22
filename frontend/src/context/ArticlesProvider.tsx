import { useState, useEffect, type ReactNode } from "react";
import { getArticles } from "../api/articles";
import { type Article } from "../types/Article";
import { ArticlesContext } from "./ArticlesContext";

export default function ArticlesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadArticles() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getArticles();

        if (!ignore) {
          setArticles(result);
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
          setError("Artiklarna kunde inte hämtas.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadArticles();

    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  function refreshArticles() {
    setReloadCount((current) => current + 1);
  }

  return (
    <ArticlesContext.Provider
      value={{ articles, isLoading, error, refreshArticles }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}
