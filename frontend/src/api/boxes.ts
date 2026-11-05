import type { Box } from "../types/Box";
import { apiRequest } from "./client";
import { type CreateBoxInput } from "../types/Box";
import { type BoxDetails } from "../types/Box";

export async function createBox(input: CreateBoxInput): Promise<Box> {
  return apiRequest("/box", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

export async function getBox(id: string): Promise<BoxDetails> {
  return apiRequest(`/box/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}
