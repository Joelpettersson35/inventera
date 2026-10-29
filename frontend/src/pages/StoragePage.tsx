import { useEffect, useState } from "react";
import Shelf from "../components/Shelf";
import ShelfDialog from "../components/ShelfDialog";
import { createShelf, getShelves } from "../api/shelves";
import { type Feedback } from "../types/Feedback";
import { ApiError } from "../api/apiError";
import Message from "../components/Message";
import { type ShelfType } from "../types/ShelfType";
import { createBox } from "../api/boxes";

export default function StoragePage() {
  const [pendingAction, setPendingAction] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [shelves, setShelves] = useState<ShelfType[]>([]);

  useEffect(() => {
    fetchShelves();
  }, []);

  async function handleCreateShelf(name: string) {
    try {
      const newShelf = await createShelf({ name: name });
      console.log("NY HYLLJVÄVEL: " + newShelf.id);
      setShelves((current) => [newShelf, ...current]);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Hyllan kunde inte skapas. Försök igen.",
      });
    } finally {
      setPendingAction(false);
    }
  }

  async function fetchShelves() {
    try {
      const response = await getShelves();
      setShelves(response);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Kunde inte hämta hyllor.",
      });
    }
  }

  async function handleCreateBox(shelfId: string, boxName: string) {
    try {
      const newBox = await createBox({ name: boxName }, shelfId);
      setShelves((current) => {
        return current.map((shelf) => {
          if (shelf.id === newBox.id) {
            return {
              ...shelf,
              boxes: [newBox, ...shelf.boxes],
            };
          }

          return shelf;
        });
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Lådan kunde inte skapas. Försök igen",
      });
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
      <h1 className="text-center w-full text-2xl font-bold mb-6">Hyllor</h1>
      {feedback && <Message type={feedback.type} message={feedback.message} />}

      {!shelves && <h2>Hittade inga hyllor...</h2>}
      <ul className="flex flex-wrap w-full gap-y-4">
        {shelves.map((shelf) => (
          <Shelf key={shelf.id} shelf={shelf} onAdd={handleCreateBox} />
        ))}
      </ul>
      {pendingAction && (
        <ShelfDialog
          onCancel={() => setPendingAction(false)}
          onCreate={handleCreateShelf}
        />
      )}
    </div>
  );
}
