import { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import { type Category } from "../types/Category";
import { createCategory } from "../api/categories";
import CategoryList from "../components/CategoryList";

export default function CategoryPage() {
  async function handleCreateCategory(input: Omit<Category, "id">) {
    console.log("hej från CategoryPage");
    console.log(input);

    try {
      const response = await createCategory(input);
      console.log("SVAR FRÅN BACKEND" + response);
    } catch (error) {
      console.log("FEL FRÅN BACKEND" + error);
    }
  }

  return (
    <div className="flex p-4">
      <CategoryForm onCreate={handleCreateCategory} />
    </div>
  );
}
