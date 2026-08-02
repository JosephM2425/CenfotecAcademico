const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type GetToken = () => Promise<string | null>;

async function throwApiError(response: Response, path: string): Promise<never> {
  const body = await response.json().catch(() => null);
  const reason = body && typeof body === "object" && "error" in body ? String(body.error) : null;
  throw new Error(reason ?? `Error ${response.status} al llamar a ${path}`);
}

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
    await throwApiError(response, path);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export async function apiUpload<T>(path: string, getToken: GetToken, formData: FormData): Promise<T> {
  const token = await getToken();
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { method: "PUT", headers, body: formData });
  if (!response.ok) {
    await throwApiError(response, path);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export async function apiDownload(path: string, getToken: GetToken): Promise<Blob> {
  const token = await getToken();
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { headers });
  if (!response.ok) {
    await throwApiError(response, path);
  }
  return response.blob();
}
