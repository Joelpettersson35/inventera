export type CategoryField = {
  label: string;
  type: "TEXT" | "NUMBER" | "BOOLEAN";
  required: boolean;
};

export type CategoryFieldDraft = CategoryField & {
  id: string;
};