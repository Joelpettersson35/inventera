import { useState, type SubmitEvent } from "react";
import CategoryScroller from "../components/CategoryScroller";
//import { categories } from "../data/categories";
import { createArticle } from "../api/articles";
import Message from "../components/Message";
import { type Feedback } from "../types/Feedback";
import { type Category } from "../types/Category";
import useCategories from "../hooks/useCategories";

export default function Create() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<Record<string, unknown>>({});

  const { categories, isLoading, error } = useCategories();

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

  function handleCategoryChange(category: Category) {
    setName("");
    setQuantity("1");
    setDescription("");
    setFeedback(null);
    setAttributes({});
    setSelectedCategory(category);
  }

  function updateAttribute(fieldId: string, value: unknown) {
    setAttributes((current) => ({
      ...current,
      [fieldId]: value,
    }));
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

    console.log(attributes);

    try {
      const article = await createArticle({
        name: name.trim(),
        quantity: amount,
        description: description.trim(),
        categoryId: selectedCategory.id,
        attributes: attributes,
      });

      console.log(article);

      clearFields();
      setFeedback({
        type: "success",
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
    <div className="flex justify-center flex-col w-full gap-2">
      <form
        onSubmit={handleCreate}
        onReset={handleClear}
        className="flex w-full flex-wrap justify-center gap-y-3"
      >
        <h2 className="text-2xl text-center w-full mt-4 font-bold">
          Skapa artikel
        </h2>

        <h3 className="text-lg">Välj kategori:</h3>
        <div className="w-full px-3">
          <CategoryScroller
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        {selectedCategory && (
          <>
            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="name">
                Namn {<span className="text-[#EF5050]"> *</span>}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="quantity">
                Saldo {<span className="text-[#EF5050]"> *</span>}
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {selectedCategory.fields.map((field) => (
              <div
                key={field.id}
                className="flex w-full justify-center items-center gap-x-2"
              >
                <label htmlFor={field.label}>
                  {field.label}{" "}
                  {field.required ? (
                    <span className="text-[#EF5050]"> *</span>
                  ) : (
                    ""
                  )}
                </label>

                {field.type === "BOOLEAN" ? (
                  <select
                    id={field.label}
                    className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                    onChange={(event) =>
                      updateAttribute(
                        field.id.toString(),
                        Boolean(event.target.value),
                      )
                    }
                  >
                    <option value="">Välj...</option>
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                ) : (
                  <input
                    id={field.label}
                    type={field.type === "NUMBER" ? "number" : "text"}
                    onChange={(event) =>
                      updateAttribute(field.id.toString(), event.target.value)
                    }
                    className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                )}
              </div>
            ))}

            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="name">Beskrivning</label>
              <textarea
                id="name"
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
          </>
        )}
      </form>

      {feedback && (
        <div className="p-4">
          <Message type={feedback.type} message={feedback.message} />
        </div>
      )}
    </div>
  );
}
