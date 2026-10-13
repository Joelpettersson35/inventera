import { useState } from "react";
import Message from "./Message";
import type { Feedback } from "../types/Feedback";
import {
  type CategoryField,
  type CategoryFieldDraft,
} from "../types/CategoryField";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<CategoryField[]>([]);

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleAddField(field: CategoryField) {
    const newField: CategoryFieldDraft = {
      ...field,
      id: crypto.randomUUID(),
    };

    setFields((current) => [...current, newField]);
  }

  function handleClear() {}
  return (
    <div className="flex flex-col w-full gap-2">
      <form
        onReset={handleClear}
        className="flex w-full flex-wrap justify-center gap-y-4"
      >
        <h2 className="text-2xl mt-4 font-bold">Hantera kategorier</h2>
        <div className="flex w-full justify-center items-center gap-x-2">
          <label htmlFor="name">Kategorinamn: </label>
          <input
            type="text"
            id="name"
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="flex w-full justify-center">
          <button
            type="button"
            className="px-2 border-2 font-semibold text-white rounded-xl bg-[#001C89]"
          >
            Nytt fält +
          </button>
        </div>

        <div className=" flex gap-x-2">
          <button
            type="submit"
            className="px-3 py-2 bg-[#001C89] text-white rounded-lg"
          >
            Skapa kategori
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
