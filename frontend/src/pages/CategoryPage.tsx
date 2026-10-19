import { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import { type Category } from "../types/Category";
import { createCategory } from "../api/categories";
import CategoryList from "../components/CategoryList";
import Message from "../components/Message";
import { type Feedback } from "../types/Feedback";

export default function CategoryPage() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showForm, setShowForm] = useState(false);
  async function handleCreateCategory(input: Omit<Category, "id">) {
    console.log("hej från CategoryPage");
    console.log(input);

    try {
      const response = await createCategory(input);
      console.log("SVAR FRÅN BACKEND" + response);
      setFeedback({type: "success", message: `Kategori ${response.name} skapades`})
    } catch (error) {
      setFeedback({type: "error", message: "Fel: " + error})
      console.log("FEL FRÅN BACKEND" + error);
    }
  }

  return (
    <div className="flex flex-wrap w-full justify-center p-4">
      {feedback && <Message type={feedback.type} message={feedback.message}/>}
      <h2 className="text-2xl my-4 w-full text-center font-bold">Hantera kategorier</h2>
      {showForm ? <CategoryForm onCreate={handleCreateCategory} onCancel={() => setShowForm(false)} /> : <button type="button" onClick={() => setShowForm(true)} className="px-3 py-2 text-white rounded-xl bg-[#001C89]  hover:bg-[#001C89]/90">Skapa ny kategori</button>}
    </div>
  );
}
