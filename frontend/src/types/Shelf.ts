import type { Box } from "./Box";

export type Shelf = {
  id: string;
  name: string;
  boxes: Box[];
};

export type CreateShelfInput = {
  name: string;
};
