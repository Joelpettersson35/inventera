import { articles } from "../data/articles";
import { Link } from "react-router";

export default function Home() {
  return (
    <section className="flex flex-col w-full p-3">
      <h2 className="text-xl font-bold mt-3 mb-4">Artiklar</h2>
      <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
        {articles.map((article) => (
          <li key={article.id}>
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

              <span className="shrink-0 tabular-nums">
                {article.quantity} st
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <button className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-full bg-[#001C89] text-white">Scanna QR</button>
    </section>
  );
}
