import { articles } from "../data/articles";
import ListItem from "../components/ListItem";
import qrcode from "../assets/qr-code.png";
import SearchForm from "../components/SearchForm";
import { useState } from "react";
import { categories } from "../data/categories";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <section className="flex flex-col w-full p-3">
      <SearchForm
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <h2 className="text-xl font-bold mt-3 mb-4">Artiklar</h2>
      <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
        {articles.map((article) => (
          <ListItem key={article.id} article={article} />
        ))}
      </ul>
    </section>
  );
}
