import { ChevronDown } from "lucide-react";
import { useState, useId, use } from "react";
import Box from "./Box";
import type { ShelfType } from "../types/ShelfType";
import type { BoxType } from "../types/BoxType";
import BoxfDialog from "./BoxDialog";

type ShelfProps = {
  shelf: ShelfType;
  onAdd: () => void;
};

export default function Shelf({ shelf, onAdd }: ShelfProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [name, setName] = useState("");
  const [pendingAction, setPendingAction] = useState(false);
  const contentId = useId();

  function handleAdd(boxName: string){
    
  }
  return (
    <li
      aria-expanded={isExpanded}
      aria-controls={contentId}
      className="flex flex-wrap w-full items-center rounded-2xl bg-gray-100 border border-gray-300 shadow-sm"
    >
      <div
        onClick={() => setIsExpanded((current) => !current)}
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
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 p-4 border-t-2 border-gray-300">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <button
              type="button"
              onClick={() => setPendingAction(true)}
              className="px-2 py-1 bg-[#001C89] text-white text-md rounded-lg"
            >
              Ny låda +
            </button>
          </div>
        </div>
      </div>
      {pendingAction && <BoxfDialog onCancel={() => setPendingAction(false)} onCreate={handleAdd} shelfName={shelf.name} />}
    </li>
  );
}
