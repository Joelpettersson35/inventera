import { useState } from "react";
import CategoryScroller from "../components/CategoryScroller";
import { categories } from "../data/categories";

export default function Create() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className="flex w-full">
      <form className="flex w-full flex-wrap justify-center gap-y-3">
        <h2 className="text-2xl mt-4 font-bold">Skapa artikel</h2>
        <div className="flex w-full justify-center items-center gap-x-2">
          <label htmlFor="name">Namn: </label>
          <input
            type="text"
            id="name"
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex w-full justify-center items-center gap-x-2">
          <label htmlFor="quantity">Antal: </label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
            autoFocus
          />
        </div>
        <h3>Välj kategori</h3>
        <div className="w-full p-3">
          <CategoryScroller
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </form>
    </div>
  );
}
