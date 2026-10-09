import { type Article } from "../types/Article";
import { Link } from "react-router";

type ListItemProps = {
  article: Article;
};

export default function ListItem({ article }: ListItemProps) {
  return (
    <li>
      <Link
        to={`/articles/${article.id}`}
        className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gray-200"
      >
        <div className="min-w-0">
          <h3 className="font-medium">{article.name}</h3>

          <p className="mt-1 text-sm text-gray-500">
            {article.id} · {article.category}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap tabular-nums">
            {article.quantity} st
          </span>

          <span aria-hidden="true" className="text-xl text-gray-500">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
