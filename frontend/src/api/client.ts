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
    throw new Error(`Anropet misslyckades (${response.status}).`);
  }

  return response.json();
}