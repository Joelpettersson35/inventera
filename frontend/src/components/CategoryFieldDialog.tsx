import type { CategoryField } from "../types/Category";
import { useState } from "react";
import Message from "./Message";
import type { Feedback } from "../types/Feedback";

type CategoryFieldDialogProps = {
  onAdd: (field: CategoryField) => void;
  onCancel: () => void;
  feedback: Feedback | null;
  setFeedback: (feedback: Feedback) => void;
};

export default function CategoryFieldDialog({
  onAdd,
  onCancel,
  feedback,
}: CategoryFieldDialogProps) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<CategoryField["type"]>("TEXT");
  const [required, setRequired] = useState(false);
  //lägg till här feedback också

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        {feedback && (
          <Message type={feedback.type} message={feedback.message} />
        )}
        <h3 className="font-bold text-xl my-3">Nytt fält</h3>

        <label field-label="name">Etikett:</label>
        <input
          id="name"
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          className="mt-1 mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#001C89]"
          autoFocus
        />

        <label field-label="type">Typ:</label>
        <select
          id="type"
          onChange={(event) => {
            setType(event.target.value as CategoryField["type"]);
          }}
          className="mt-1 mb-3 w-full rounded-lg border px-3 py-2"
        >
          <option value="TEXT">Text</option>
          <option value="NUMBER">Nummer</option>
          <option value="BOOLEAN">Ja/nej</option>
        </select>

        <label className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={required}
            onChange={(event) => setRequired(event.target.checked)}
          />
          Obligatoriskt fält
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Avbryt
          </button>

          <button
            type="button"
            onClick={() => onAdd({ label: label.trim(), type, required })}
            className="rounded-lg bg-[#001C89] px-4 py-2 font-medium text-white hover:bg-[#001C89]/90"
          >
            Skapa
          </button>
        </div>
      </div>
    </div>
  );
}
