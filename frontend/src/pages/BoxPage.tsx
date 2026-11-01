import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { type Article } from "../types/Article";
import ArticleListItem from "../components/ArticleListItem";
import { type BoxDetails } from "../api/boxes";

export default function BoxPage() {
  const [box, setBox] = useState<BoxDetails | null>(null);
  const { boxId } = useParams();

  useEffect(() => {});

  async function fetchBox() {}
  return (
    <div className="flex flex-wrap w-full px-3 py-6">
      <Link
        to="/storage"
        className="text-lg mr-auto font-semibold text-[#001C89] hover:underline"
      >
        <span className="text-2xl">←</span> Hyllor
      </Link>

      <h1 className="w-full text-2xl text-center font-bold">Låda: Övrigt</h1>

      <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 mb-4">
        {box &&
          box.articles.map((article) => (
            <ArticleListItem
              key={article.articleId}
              article={article.article}
            />
          ))}
      </ul>
    </div>
  );
}
