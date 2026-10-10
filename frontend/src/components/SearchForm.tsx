import CategoryScroller from "./CategoryScroller";

type ArticleFiltersProps = {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export default function SearchForm({
  categories,
  selectedCategory,
  onCategoryChange,
}: ArticleFiltersProps) {
  return (
    <div className="flex flex-wrap w-full min-w-0">
      <form className="flex flex-wrap w-full justify-center gap-x-1.5">
        <label
          htmlFor="article-search"
          className="w-full text-center text-2xl font-bold mb-3"
        >
          Sök artiklar
        </label>
        <input
          type="text"
          id="article-search"
          placeholder="ID eller artikelnamn"
          className="border-2 border-gray-200 rounded-lg p-2"
        />
        <button
          type="submit"
          className="py-1 px-4 text-md text-white bg-[#001C89] rounded-xl"
        >
          Sök
        </button>
      </form>

      <div className="mt-4 w-full">
        <CategoryScroller
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
