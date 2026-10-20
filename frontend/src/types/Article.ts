
export type Article = {
  id: string;
  name: string;
  quantity: number;
  description: string;
  categoryId: string;
  attributes: Record<string, unknown>;
};
