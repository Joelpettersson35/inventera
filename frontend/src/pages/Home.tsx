import { articles } from "../data/articles";
import ListItem from "../components/ListItem";
import qrcode from "../assets/qr-code.png";

export default function Home() {
  return (
    <section className="flex flex-col w-full p-3">
      <h2 className="text-xl font-bold mt-3 mb-4">Artiklar</h2>
      <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
        {articles.map((article) => (
          <ListItem key={article.id} article={article} />
        ))}
      </ul>

      <button className="flex align-middle gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-full bg-[#001C89]">
        <img
          src={qrcode}
          alt=""
          className="h-10 w-10 shrink-0 object-contain"
        />
      </button>
    </section>
  );
}
