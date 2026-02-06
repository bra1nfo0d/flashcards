import { apiFetch } from "./api";

export function createFolder(data) {
  return apiFetch("/api/folders/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getAllFolders(data) {
  return apiFetch("/api/folders/get-all", {
    method: "GET",
  });
}

export function deleteFolder(id) {
  return apiFetch(`/api/folders/${id}`, {
    method: "DELETE",
  });
}
