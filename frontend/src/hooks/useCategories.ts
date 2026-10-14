import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

export default function useCategories() {
  const context = useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error(
      "useCategories måste användas inom CategoriesProvider.",
    );
  }

  return context;
}