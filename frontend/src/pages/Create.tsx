import { useState, type SubmitEvent } from "react";
import CategoryScroller from "../components/CategoryScroller";
import { categories } from "../data/categories";
import { createArticle } from "../api/articles";
import Message from "../components/Message";
import { type MessageType } from "../components/Message";

type Feedback = {
  type: MessageType;
  message: string;
};

export default function Create() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function clearFields() {
    setName("");
    setQuantity("1");
    setDescription("");
    setSelectedCategory(null);
  }

  function handleClear() {
    clearFields();
    setFeedback(null);
  }

  async function handleCreate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("lägg till klickad");
    if (isSubmitting) return;

    setFeedback(null);

    const amount = Number(quantity);

    if (!name.trim()) {
      console.log("fel namn");
      setFeedback({ type: "error", message: "Ge artikeln ett namn" });
      return;
    }

    if (!Number.isInteger(amount) || amount < 1) {
      setFeedback({ type: "error", message: "Ange ett positivt heltal." });
      return;
    }

    if (!selectedCategory) {
      setFeedback({ type: "error", message: "Välj en kategori." });
      return;
    }

    setIsSubmitting(true);

    try {
      const article = await createArticle({
        name: name.trim(),
        quantity: amount,
        description: description.trim(),
        category: selectedCategory,
      });

      clearFields();
      setFeedback({
        type: "error",
        message: `Artikeln "${article.name}" har skapats.`,
      });
    } catch (error) {
      console.error("Fel vid skapande av artikel:", error);

      setFeedback({
        type: "error",
        message: "Artikeln kunde inte skapas. Försök igen.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <form
        onSubmit={handleCreate}
        onReset={handleClear}
        className="flex w-full flex-wrap justify-center gap-y-3"
      >
        <h2 className="text-2xl mt-4 font-bold">Skapa artikel</h2>
        <div className="flex w-full justify-center items-center gap-x-2">
          <label htmlFor="name">Namn: </label>
          <input
            type="text"
            id="name"
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex w-full justify-center items-center gap-x-2">
          <label htmlFor="quantity">Antal: </label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
            autoFocus
          />
        </div>
        <h3 className="text-lg">Välj kategori:</h3>
        <div className="w-full px-3">
          <CategoryScroller
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className=" flex gap-x-2">
          <button
            type="submit"
            className="px-3 py-2 bg-[#001C89] text-white rounded-lg"
          >
            Lägg till
          </button>
          <button type="reset" className="px-3 py-2 rounded-lg border">
            Rensa
          </button>
        </div>
      </form>

      {feedback && (
        <div className="p-4">
          <Message type={feedback.type} message={feedback.message} />
        </div>
      )}
    </div>
  );
}
