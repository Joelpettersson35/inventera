import type { CategoryField } from "./Category";

export type Article = {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
    fields: CategoryField[];
  };
  attributes: Record<string, unknown>;
};

// I vilken låda, hur många och i vilken hylla finns artikeln
export type ArticlePlacement = {
  boxId: string;
  quantity: number;
  box: {
    id: string;
    name: string;
    shelf: {
      id: string;
      name: string;
    };
  };
};

//Info om artikeln samt på vilka ställen den finns
export type ArticleDetails = Article & {
  placements: ArticlePlacement[];
};

//Id skapas av backend
export type CreateArticleInput = {
  name: string;
  description?: string;
  categoryId: string;
  boxId: string;
  quantity: number;
  attributes: Record<string, unknown>;
};
