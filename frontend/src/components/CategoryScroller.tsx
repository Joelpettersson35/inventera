type CategoryScrollerProps = {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string) => void;
};

export default function CategoryScroller({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryScrollerProps) {
  return (
    <div
      role="group"
      aria-label="Välj kategori"
      className="flex gap-2 overflow-x-auto pb-2"
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
          className={`shrink-0 whitespace-nowrap rounded-xl border px-3 py-2 ${
            selectedCategory === category
              ? "border-[#001C89] bg-[#001C89] text-white"
              : "border-gray-300 bg-white hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
