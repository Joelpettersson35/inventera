import type { BoxType } from "./BoxType";

export type ShelfType = {
  id: string;
  name: string;
  boxes: BoxType[];
};
