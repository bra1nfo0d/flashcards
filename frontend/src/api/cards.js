import { apiFetch } from "./api";

export function createCard(data) {
  return apiFetch("/api/cards/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
