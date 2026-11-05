import type { Shelf } from "../types/Shelf";
import { apiRequest } from "./client";
import { type CreateShelfInput } from "../types/Shelf";

export function createShelf(shelf: CreateShelfInput): Promise<Shelf> {
  return apiRequest<Shelf>("/shelf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shelf),
  });
}

export function getShelves(): Promise<Shelf[]> {
  return apiRequest<Shelf[]>("/shelves", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
