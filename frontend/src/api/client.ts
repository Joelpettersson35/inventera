import { ApiError } from "./apiError";

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("Backendens URL saknas i VITE_API_URL.");
  }

  const response = await fetch(
    baseUrl + path,
    options,
  );

  if (!response.ok) {

    const body: unknown = await response.json().catch(() => null);

    let message = `Anropet misslyckades (${response.status}).`;

    //kontrollerar att svaret är ett objekt, inte är null, om det innehåller ett "message"-fält och att fältet är en sträng
      if (
        typeof body === "object" &&
        body !== null &&
        "message" in body &&
        typeof body.message === "string" &&
        body.message.trim()
      ) {
        message = body.message;
      }
        throw new ApiError(response.status, message);
  }

  return response.json();
}