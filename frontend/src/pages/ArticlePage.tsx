import { useState, useEffect, use } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import QuantityDialog from "../components/QuantityDialog";
import { type ArticleDetails, type Article } from "../types/Article";
import { getArticle } from "../api/articles";
import { MoveRight } from "lucide-react";

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
    <section className="flex flex-wrap w-full px-4 py-6">
      <Link
        to={`/box/${selectedPlacement?.boxId}`}
        className="text-lg font-semibold text-[#001C89] hover:underline"
      >
        <span className="text-2xl">←</span> {selectedPlacement?.box.name}
      </Link>

      <h2 className="w-full text-2xl font-semibold">{article.name}</h2>
      <ul className="w-full text-sm text-gray-500">
        <li>Artikelnummer: {article.id}</li>
        <li>Kategori: {article.category.name}</li>
        {article.category.fields.map((field) => {
          const value = article.attributes[field.id];
          let displayValue = "Ej angivet";

          if (typeof value === "boolean") {
            displayValue = value ? "Ja" : "Nej";
          } else if (typeof value === "string" || typeof value === "number") {
            displayValue = value.toString();
          }

          return <li>{`${field.label}: ${displayValue}`}</li>;
        })}
        <li>Beskrivning: {article.description}</li>
      </ul>

      <div className="mt-6 flex flex-wrap w-full items-center rounded-lg border border-gray-300 bg-gray-100 px-5 pb-5">
        {selectedPlacement && (
          <div className="flex w-full gap-x-2 bg-gray-100 py-2 pr-2 border-b border-gray-300 items-center">
            <p className="font-semibold">Placering: </p>
            <div className="flex items-center">
              <p className="mr-1">Hylla</p>
              <Link to="/storage" className="font-bold underline">
                {selectedPlacement.box.shelf.name}
              </Link>
              <MoveRight className="mx-2" />
              <p className="mr-1">Låda</p>
              <Link
                to={`/box/${selectedPlacement.boxId}`}
                className="font-bold underline"
              >
                {selectedPlacement.box.name}
              </Link>
            </div>
          </div>
        )}
        <div className="flex w-full pt-2 justify-between items-center">
          <span className="text-lg">Lådans saldo:</span>

          <span className="text-3xl font-semibold tabular-nums">
            {selectedPlacement?.quantity} st
          </span>
        </div>
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
