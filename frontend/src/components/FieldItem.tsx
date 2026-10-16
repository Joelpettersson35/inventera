import type { CategoryField } from "../types/Category";
import { SquarePen, Trash } from "lucide-react";

type FieldItemProps = {
  field: CategoryField;
  onEdit: () => void;
};

export default function FieldItem({ field, onEdit }: FieldItemProps) {
  function translateType(type: string) {
    switch (type) {
      case "TEXT":
        return "Text";
      case "NUMBER":
        return "Nummerisk";
      case "BOOLEAN":
        return "Ja/nej";
      default:
        return type;
    }
  }
  return (
    <div className="flex flex-wrap w-full items-center gap-x-3 bg-gray-100 border-gray-300 rounded-xl px-4 py-3 shadow-sm">
      {field.required && (
        <p className="w-full justify-self-end text-xs">Obligatoriskt</p>
      )}
      <div className="flex gap-x-3 text-center items-center">
        <p className="font-semibold">{field.label}</p>
        <p className="text-sm border-l-2 border-gray-300 pl-3">
          {translateType(field.type)}
        </p>
      </div>

      <div className="flex ml-auto gap-x-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-md p-1 hover:bg-gray-300 active:bg-gray-300"
        >
          <SquarePen />
        </button>
        <button
          type="button"
          className="rounded-md p-1 hover:bg-gray-300 active:bg-gray-300"
        >
          <Trash color="#d15a5a" />
        </button>
      </div>
    </div>
  );
}
