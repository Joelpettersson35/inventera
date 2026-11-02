import type { Category } from "../types/Category";
import useCategories from "../hooks/useCategories";
import { type SubmitEvent } from "react";

type CreateArticleProps = {
  selectedCategory: Category | null;
  onCreate: (event: SubmitEvent<HTMLFormElement>) => void;
};

export default function CreateArticleForm({
  selectedCategory,
}: CreateArticleProps) {
  const { categories, isLoading, error } = useCategories();
  return (
    <div className="flex justify-center p-4 flex-col w-full gap-2">
      <form
        onSubmit={handleCreate}
        onReset={handleClear}
        className="flex w-full flex-wrap justify-center gap-y-3"
      >
        <h2 className="text-2xl text-center w-full mt-4 font-bold">
          Skapa artikel
        </h2>

        <h3 className="text-lg">Välj kategori:</h3>
        {isLoading && <Spinner message="Hämtar Kategorier..." />}
        {error ? (
          <Message type="error" message={error} />
        ) : (
          <div className="w-full px-3">
            <CategoryScroller
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        )}

        {selectedCategory && (
          <>
            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="name">
                Namn {<span className="text-[#EF5050]"> *</span>}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="quantity">
                Saldo {<span className="text-[#EF5050]"> *</span>}
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {selectedCategory.fields.map((field) => (
              <div
                key={field.id}
                className="flex w-full justify-center items-center gap-x-2"
              >
                <label htmlFor={field.id.toString()}>
                  {field.label}{" "}
                  {field.required ? (
                    <span className="text-[#EF5050]"> *</span>
                  ) : (
                    ""
                  )}
                </label>

                {field.type === "BOOLEAN" ? (
                  <select
                    id={field.id.toString()}
                    className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                    onChange={(event) =>
                      updateAttribute(
                        field.id.toString(),
                        Boolean(event.target.value),
                      )
                    }
                  >
                    <option value="">Välj...</option>
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                ) : (
                  <input
                    id={field.id.toString()}
                    type={field.type === "NUMBER" ? "number" : "text"}
                    onChange={(event) => {
                      if (field.type === "TEXT") {
                        updateAttribute(
                          field.id.toString(),
                          event.target.value,
                        );
                      } else {
                        updateAttribute(
                          field.id.toString(),
                          Number(event.target.value),
                        );
                      }
                    }}
                    className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                )}
              </div>
            ))}

            <div className="flex w-full justify-center items-center gap-x-2">
              <label htmlFor="name">Beskrivning</label>
              <textarea
                id="name"
                className="mt-1 rounded-lg border border-gray-300 px-3 py-2"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className=" flex gap-x-2">
              <button
                type="submit"
                className="px-3 py-2 bg-[#001C89] text-white rounded-lg"
              >
                Lägg till
              </button>
              <button type="reset" className="px-3 py-2 rounded-lg border">
                Rensa
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
