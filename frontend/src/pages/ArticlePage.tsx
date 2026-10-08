import { useState } from "react";
import { Link, useParams } from "react-router";
import { articles } from "../data/articles";
import QuantityDialog from "../components/QuantityDialog";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((item) => String(item.id) === id);

  // State
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState("1");
  const [message, setMessage] = useState("");
  const [pendingAction, setPendingAction] = useState<"add" | "take" | null>(
    null,
  );

  // Använd det uppdaterade saldot om det finns, annars artikelns startsaldo.
  const quantity = article
    ? (quantities[String(article.id)] ?? article.quantity)
    : 0;

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

  function changeStock(action: "add" | "take") {
    if (!article) return;

    const value = Number(amount);

    if (!Number.isInteger(value) || value <= 0) {
      setMessage("Ange ett positivt heltal.");
      return;
    }

    if (action === "take" && value > quantity) {
      setMessage("Det finns inte tillräckligt många i lager.");
      return;
    }

    const articleId = String(article.id);

    setQuantities((current) => {
      const currentQuantity = current[articleId] ?? article.quantity;

      return {
        ...current,
        [articleId]:
          action === "add" ? currentQuantity + value : currentQuantity - value,
      };
    });

    closeQuantityDialog();
  }

  // Alla hooks ligger ovanför denna tidiga return.
  if (!article) {
    return (
      <section className="mx-auto max-w-2xl px-3 py-6">
        <Link to="/" className="text-[#001C89] hover:underline">
          ← Alla artiklar
        </Link>

        <p className="mt-6">Artikeln hittades inte.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-3 py-6">
      <Link
        to="/"
        className="text-lg font-semibold text-[#001C89] hover:underline"
      >
        ← Alla artiklar
      </Link>

      <h2 className="mt-6 text-2xl font-semibold">{article.name}</h2>

      <p className="mt-2 text-sm text-gray-500">
        Artikelnummer: {article.id} · Kategori: {article.category}
      </p>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-5">
        <span>Lagersaldo</span>

        <span className="text-3xl font-semibold tabular-nums">
          {quantity} st
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
