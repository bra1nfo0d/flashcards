import { apiFetch } from "./api";

export function createFolder(data) {
  return apiFetch("/api/folders/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
