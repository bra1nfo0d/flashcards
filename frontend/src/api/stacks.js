import { apiFetch } from "./api";

export function createStack(data) {
  return apiFetch("/api/stacks/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getAllStacks(data) {
  return apiFetch("/api/stacks/get-all", {
    method: "GET",
  });
}
