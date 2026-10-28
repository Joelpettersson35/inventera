import { useState } from "react";
import Shelf from "../components/Shelf";
import ShelfDialog from "../components/ShelfDialog";
import { createShelf } from "../api/shelves";
import { type Feedback } from "../types/Feedback";
import { ApiError } from "../api/apiError";
import Message from "../components/Message";
import { type ShelfType } from "../types/ShelfType";

export default function StoragePage() {
  const [pendingAction, setPendingAction] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [shelves, setShelves] = useState<ShelfType[]>([]);

  async function handleCreate(name: string) {
    try {
      const newShelf = await createShelf({ name: name });
      console.log("NY HYLLJVÄVEL: " + newShelf);
      setShelves((current) => [newShelf, ...current]);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Artikeln kunde inte skapas. Försök igen.",
      });
    } finally {
      setPendingAction(false);
    }
  }
  return (
    <div className="flex flex-wrap w-full justify-center p-4">
      <button
        type="button"
        onClick={() => setPendingAction(true)}
        className="ml-auto px-2 py-1 mb-2 text-white rounded-lg bg-[#001C89]"
      >
        Skapa hylla
      </button>
      {feedback && <Message type={feedback.type} message={feedback.message} />}
      <h1 className="text-center w-full text-2xl font-bold mb-6">Hyllor</h1>

      <ul className="flex flex-wrap w-full gap-y-4">
        {shelves.map((shelf) => (
          <Shelf key={shelf.id} shelf={shelf} />
        ))}
      </ul>
      {pendingAction && (
        <ShelfDialog
          onCancel={() => setPendingAction(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
