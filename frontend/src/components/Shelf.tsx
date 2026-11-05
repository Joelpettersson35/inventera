import { ChevronDown } from "lucide-react";
import { useState, useId, use } from "react";
import Box from "./Box";
import type { Shelf } from "../types/Shelf";
import type { Box as BoxType } from "../types/Box";
import BoxfDialog from "./BoxDialog";
import type { Feedback } from "../types/Feedback";
import Message from "./Message";

type ShelfProps = {
  shelf: Shelf;
  onAdd: (shelfId: string, boxName: string) => Promise<boolean>;
};

export default function Shelf({ shelf, onAdd }: ShelfProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pendingAction, setPendingAction] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const contentId = useId();

  async function handleAdd(boxName: string) {
    const success = onAdd(shelf.id, boxName);

    if (!success) {
      setFeedback({ type: "error", message: "Kunde inte skapa hylla" });
    } else {
      setFeedback({ type: "success", message: `${boxName.trim()} skapades` });
    }
    console.log(success);

    setPendingAction(false);
  }

  return (
    <li
      aria-expanded={isExpanded}
      aria-controls={contentId}
      className="flex flex-wrap w-full items-center rounded-2xl bg-gray-100 border border-gray-300 shadow-sm"
    >
      <div
        onClick={() => {
          setIsExpanded((current) => !current);
        }}
        className="flex w-full p-4"
      >
        <p>{shelf.name}</p>

        <ChevronDown
          aria-controls=""
          className={`shrink-0 ml-auto rounded-xl transition-transform duration-300 motion-reduce:transition-none ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        id={contentId}
        inert={!isExpanded}
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 p-4 border-t-2 border-gray-300">
            {feedback && (
              <div className="col-span-full">
                <Message type={feedback.type} message={feedback.message} />
              </div>
            )}
            {shelf.boxes.map((box) => (
              <Box key={box.id} box={box} />
            ))}
          </div>
          <div className="flex justify-end px-4 pb-4">
            <button
              type="button"
              onClick={() => setPendingAction(true)}
              className="rounded-lg bg-[#001C89] px-3 py-2 text-white"
            >
              Ny låda +
            </button>
          </div>
        </div>
      </div>
      {pendingAction && (
        <BoxfDialog
          onCancel={() => setPendingAction(false)}
          onCreate={handleAdd}
          shelfName={shelf.name}
        />
      )}
    </li>
  );
}
