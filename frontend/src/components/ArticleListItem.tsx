import type { BoxArticleType } from "../api/boxes";
import { type Article } from "../types/Article";
import { Link } from "react-router";

type ArticleListItemProps = {
  placement: BoxArticleType;
};

export default function ArticleListItem({ placement }: ArticleListItemProps) {
  return (
    <li>
      <Link
        to={`/articles/${placement.articleId}`}
        className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gray-200"
      >
        <div className="min-w-0">
          <h3 className="font-medium">{placement.article.name}</h3>

          <p className="mt-1 text-sm text-gray-500">
            {placement.article.categoryId} · {placement.article.category.name}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap tabular-nums">
            {placement.quantity} st
          </span>

          <span aria-hidden="true" className="text-xl text-gray-500">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
