import { useEffect, useState, type ReactNode } from "react";
import type { Category } from "../types/Category";
import { getCategories } from "../api/categories";
import { CategoriesContext } from "./CategoriesContext";

export default function CategoriesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getCategories();

        if (!ignore) {
          setCategories(result);
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
          setError("Kategorierna kunde inte hämtas.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  function refreshCategories() {
    setReloadCount((current) => current + 1);
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        refreshCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
