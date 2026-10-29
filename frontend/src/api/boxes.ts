import type { BoxType } from "../types/BoxType";
import { apiRequest } from "./client";

export type CreateBoxInput = Omit<BoxType, "id" | "shelfId">;

export async function createBox(
  box: CreateBoxInput,
  shelfId: string,
): Promise<BoxType> {
  return apiRequest("/box", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(box),
  });
}
