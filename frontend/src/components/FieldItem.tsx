import type { CategoryField } from "../types/Category";

type FieldItemProps = {
  field: CategoryField;
};

export default function FieldItem({ field }: FieldItemProps) {
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
    <div className="flex gap-x-3 gap-y-4 bg-gray-100 border-gray-300 rounded-xl px-3 py-2">
      <p>{field.label}</p>
      <p>{translateType(field.type)}</p>
      {field.required && <p>Obligatorisk</p>}
      <button type="button" className="border justify-self-end">
        Ta bort
      </button>
    </div>
  );
}
