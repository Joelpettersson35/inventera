import ArticleListItem from "../components/ArticleListItem";
import qrcode from "../assets/qr-code.png";
import SearchForm from "../components/SearchForm";
import { useState } from "react";
//import { categories } from "../data/categories";
import useCategories from "../hooks/useCategories";
import type { Category } from "../types/Category";
import useArticles from "../hooks/useArticles";
import Message from "../components/Message";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const {
    articles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useArticles();
  const { categories, isLoading, error } = useCategories();
  return (
    <section className="flex flex-col w-full p-3">
      <SearchForm
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <h2 className="text-xl font-bold mt-3 mb-4">Artiklar</h2>
      {articlesError && <Message type="error" message={articlesError} />}
    </section>
  );
}
