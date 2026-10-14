export type CategoryField = {
  label: string;
  type: "TEXT" | "NUMBER" | "BOOLEAN";
  required: boolean;
};

export type CategoryFieldDraft = CategoryField & {
  id: number;
};

export type Category = {
    id: string
    name: string;
    fields: CategoryField[]
}