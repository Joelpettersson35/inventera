import { useState } from "react";
import Message from "./Message";
import { type Feedback } from "../types/Feedback";

type ShelfDialogProps = {
  onCancel: () => void;
  onCreate: (name: string) => void;
};

export default function ShelfDialog({ onCancel, onCreate }: ShelfDialogProps) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleCreate() {
    if (!name.trim()) {
      setFeedback({ type: "error", message: "Ge hyllan ett namn" });
      return;
    }

    onCreate(name);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        {feedback && (
          <Message type={feedback.type} message={feedback.message} />
        )}
        <h3 className="font-bold text-xl my-3">Ny hylla</h3>
        <label field-label="name">Namn:</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder={`"Hylla 1a"`}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#001C89]"
          autoFocus
        />
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Avbryt
          </button>

          <button
            onClick={handleCreate}
            className="rounded-lg bg-[#001C89] px-4 py-2 font-medium text-white hover:bg-[#001C89]/90"
          >
            Skapa
          </button>
        </div>
      </div>
    </div>
  );
}
