import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { type Article } from "../types/Article";
import ArticleListItem from "../components/ArticleListItem";
import { getBox, type BoxDetails } from "../api/boxes";

export default function BoxPage() {
  const [box, setBox] = useState<BoxDetails | null>(null);
  const { boxId } = useParams();

  useEffect(() => {
    fetchBox();
  }, []);

  async function fetchBox() {
    try {
      if (!boxId) {
        return;
      }
      const box = await getBox(boxId);
      setBox(box);
      console.log(box);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-wrap justify-center w-full px-3 py-6">
      <Link
        to="/storage"
        className="text-lg mr-auto font-semibold text-[#001C89] hover:underline"
      >
        <span className="text-2xl">←</span> Hyllor
      </Link>

      <h1 className="w-full text-2xl text-center font-bold">{box?.name}</h1>

      <Link
        to={`/create?boxId=${boxId}`}
        className="text-white bg-[#001C89] px-2 py-1 my-4 rounded-xl"
      >
        Lägg till artikel
      </Link>

      <h2 className="w-full text-start px-2 text-2xl">Innehåll</h2>

      {box &&
        (box.articles.length === 0 ? (
          <p className="text-xl text-gray-600">Lådan är tom.</p>
        ) : (
          <ul className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 mb-4">
            {box &&
              box.articles.map((placement) => (
                <ArticleListItem
                  key={placement.articleId}
                  placement={placement}
                />
              ))}
          </ul>
        ))}
    </div>
  );
}
