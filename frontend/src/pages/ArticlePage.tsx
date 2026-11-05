import { useState, useEffect, use } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import QuantityDialog from "../components/QuantityDialog";
import { type ArticleDetails, type Article } from "../types/Article";
import { getArticle } from "../api/articles";

type ArticlePageProps = {
  article: Article;
};

export default function ArticlePage() {
  const { articleId } = useParams();
  const [searchParams] = useSearchParams();
  const boxId = searchParams.get("boxId");

  // State
  const [article, setArticle] = useState<ArticleDetails | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState("1");
  const [message, setMessage] = useState("");
  const [pendingAction, setPendingAction] = useState<"add" | "take" | null>(
    null,
  );
  const selectedPlacement = boxId
    ? article?.placements.find((placement) => placement.boxId === boxId)
    : undefined;

  useEffect(() => {
    let ignore = false;

    async function fetchArticle() {
      setArticle(null);

      if (!articleId) return;

      try {
        const fetchedArticle = await getArticle(articleId);

        if (!ignore) {
          setArticle(fetchedArticle);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Kunde inte hämta artikeln:", error);
          // Sätt eventuell feedback här.
        }
      }
    }

    void fetchArticle();

    return () => {
      ignore = true;
    };
  }, [articleId]);

  // Funktioner
  function openQuantityDialog(action: "add" | "take") {
    setAmount("1");
    setMessage("");
    setPendingAction(action);
  }

  function closeQuantityDialog() {
    setPendingAction(null);
    setMessage("");
  }

  function changeStock(action: "add" | "take") {}

  // Alla hooks ligger ovanför denna tidiga return.
  if (!article) {
    return (
      <section className="mx-auto max-w-2xl px-3 py-6">
        <Link to="/storage" className="text-[#001C89] hover:underline">
          ← Hyllor
        </Link>

        <p className="mt-6">Artikeln hittades inte.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-3 py-6">
      <Link
        to="/storage"
        className="text-lg font-semibold text-[#001C89] hover:underline"
      >
        <span className="text-2xl">←</span> Hyllor
      </Link>

      <div></div>
      <h2 className="mt-6 text-2xl font-semibold">{article.name}</h2>

      <ul className="mt-2 text-sm text-gray-500">
        {selectedPlacement && (
          <li>
            Hylla:
            <span className="font-semibold underline">
              {` ${selectedPlacement.box.shelf.name}`}
            </span>
            Fack:
            <span className="font-semibold underline">
              {selectedPlacement.box.name}
            </span>
          </li>
        )}

        <li>Artikelnummer: {article.id}</li>
        <li>Kategori: {article.category.name}</li>
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-5">
        <span>I denna låda:</span>

        <span className="text-3xl font-semibold tabular-nums">
          {selectedPlacement?.quantity} st
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openQuantityDialog("take")}
          className="rounded-lg bg-[#001C89] px-5 py-3 font-medium text-white hover:bg-[#001C89]/90"
        >
          Ta ut
        </button>

        <button
          type="button"
          onClick={() => openQuantityDialog("add")}
          className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 font-medium hover:bg-gray-200"
        >
          Fyll på
        </button>
      </div>

      {pendingAction && (
        <QuantityDialog
          action={pendingAction}
          amount={amount}
          message={message}
          onAmountChange={setAmount}
          onClose={closeQuantityDialog}
          onConfirm={() => changeStock(pendingAction)}
        />
      )}
    </section>
  );
}
