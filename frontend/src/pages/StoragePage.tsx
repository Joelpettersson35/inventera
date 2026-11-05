import { useEffect, useState } from "react";
import Shelf from "../components/Shelf";
import ShelfDialog from "../components/ShelfDialog";
import { createShelf, getShelves } from "../api/shelves";
import { type Feedback } from "../types/Feedback";
import { ApiError } from "../api/apiError";
import Message from "../components/Message";
import { type Shelf as ShelfType } from "../types/Shelf";
import { createBox } from "../api/boxes";
import Skeleton from "../components/Skeleton";

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

  async function handleCreateBox(
    shelfId: string,
    boxName: string,
  ): Promise<boolean> {
    try {
      const newBox = await createBox({ name: boxName, shelfId: shelfId });
      console.log(newBox.id);
      setShelves((current) => {
        return current.map((shelf) => {
          if (shelf.id === newBox.shelfId) {
            return {
              ...shelf,
              boxes: [newBox, ...shelf.boxes],
            };
          }

          return shelf;
        });
      });
      setFeedback({
        type: "success",
        message: `Lådan "${newBox.name}" skapades`,
      });
      return true;
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Lådan kunde inte skapas. Försök igen",
      });

      return false;
    }
  }
  return (
    <div className="flex flex-wrap w-full justify-center p-4">
      <h1 className="text-center w-full text-2xl font-bold mb-3">Hyllor</h1>
      <button
        type="button"
        onClick={() => setPendingAction(true)}
        className="ml-auto px-2 py-1 mb-2 text-white rounded-lg bg-[#001C89]"
      >
        Skapa hylla
      </button>
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
