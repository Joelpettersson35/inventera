import { useState, useRef, type SubmitEvent } from "react";
import Message from "./Message";
import type { Feedback } from "../types/Feedback";
import {
  type Category,
  type CategoryField,
  type CategoryFieldDraft,
} from "../types/Category";
import CategoryFieldDialog from "./CategoryFieldDialog";
import FieldItem from "./FieldItem";

type CategoryFormProps = {
  onCreate: (category: Omit<Category, "id">) => void;
  onCancel: () => void;
};

export default function CategoryForm({ onCreate, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<CategoryFieldDraft[]>([]);
  const [selectedField, setSelectedField] = useState<CategoryFieldDraft | null>(
    null,
  );
  const [pendingAction, setPendingAction] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const newFieldId = useRef(0);

  function handleAddField(field: CategoryField) {
    if (!field.label.trim()) {
      console.log("ange LABEL!!!");
      setFeedback({ type: "error", message: "Ge fältet en etikett" });
      return;
    }
    //lägger till ett id för på det nya fältet
    const newField: CategoryFieldDraft = {
      ...field,
      id: newFieldId.current++,
    };

    console.log(newField);

    setFields((current) => [...current, newField]); //lägger till det nya fältet längst bak
    setPendingAction(false);
    setSelectedField(null);
    setFeedback(null);
  }

  function handleClear() {}

  function handleOpenEdit(id: number) {
    console.log("klickade på field: " + id);
    const editField = fields.find((field) => field.id === id);
    if (editField !== undefined) {
      setSelectedField(editField);
      setPendingAction(true);
    }
  }

  function handleChanges(changes: CategoryField) {
    console.log("förösker spara" + selectedField?.id);
    setFields((current) =>
      current.map((field) =>
        field.id === selectedField?.id ? { ...field, ...changes } : field,
      ),
    );
    setPendingAction(false);
    setSelectedField(null);
  }

  function handleCreateCategory(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const newCategory: Omit<Category, "id"> = {
      name,
      fields,
    };

    onCreate(newCategory);
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <form
        onSubmit={handleCreateCategory}
        onReset={handleClear}
        className="flex w-full flex-wrap justify-center"
      >
        <div className="flex w-full flex-col justify-center items-center gap-x-2">
          <label htmlFor="name" className="font-semibold">
            Ny kategori{" "}
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2 mb-3"
            value={name}
            placeholder="Kategorinamn"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap w-full gap-y-3 mb-3">
          {fields.map((field) => (
            <FieldItem
              key={field.id}
              field={field}
              onEdit={() => handleOpenEdit(field.id)}
            />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={() => setPendingAction(true)}
            className="px-2 py-1 border-2 mb-8 font-semibold text-white rounded-xl bg-[#001C89]  hover:bg-[#001C89]/90"
          >
            Lägg till fält +
          </button>
        </div>

        <div className=" flex gap-x-2">
          <button
            type="submit"
            className="px-3 py-2 bg-[#001C89] text-white rounded-lg  hover:bg-[#001C89]/90"
          >
            Skapa kategori
          </button>
          <button
            type="reset"
            onClick={onCancel}
            className="px-3 py-2 rounded-lg border hover:bg-gray-100"
          >
            Avbryt
          </button>
        </div>
      </form>

      {pendingAction && (
        <CategoryFieldDialog
          onAdd={handleAddField}
          onCancel={() => {
            setPendingAction(false);
            setFeedback(null);
            setSelectedField(null);
          }}
          onEdit={handleChanges}
          selectedField={selectedField}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      )}

      {feedback && (
        <div className="p-4">
          <Message type={feedback.type} message={feedback.message} />
        </div>
      )}
    </div>
  );
}
