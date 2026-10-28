import type { ShelfType } from "../types/ShelfType";
import { apiRequest } from "./client";


export type CreateShelfInput = Omit<ShelfType, "id">;

export function createShelf(
  shelf: CreateShelfInput,
): Promise<ShelfType> {
  return apiRequest<ShelfType>("/shelf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shelf),
  });
}