const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type GetToken = () => Promise<string | null>;

/** Calls the backend, attaching the Clerk session token so it can verify the caller's identity. */
export async function apiFetch<T>(
  path: string,
  getToken: GetToken,
  init: RequestInit = {},
): Promise<T> {
  const token = await getToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    throw new Error(`Error ${response.status} al llamar a ${path}`);
  }
  return response.json() as Promise<T>;
}
