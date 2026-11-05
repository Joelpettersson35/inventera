import { type Article } from "./Article";

export type Box = {
  id: string;
  name: string;
  shelfId: string;
};

export type CreateBoxInput = {
  name: string;
  shelfId: string;
};

//koppling mellan låda och artikel
export type BoxArticleType = {
  boxId: string;
  articleId: string;
  quantity: number;
  article: Article;
};

//innehåller info om vart lådan, vart den finns, och vad som finns i lådan
export type BoxDetails = Box & {
  articles: BoxArticleType[];
};
