import { type Category } from "../types/Category";
import CategoryListItem from "./CategoryListItem";

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  return <ul className="flex flex-wrap w-full mt-4 px-4 rounded-2xl divide-y bg-gray-200 divide-gray-400">
    {categories.map((category) => (
      <CategoryListItem category={category}/>
    ))}
  </ul>;
}
