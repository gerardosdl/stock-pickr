import sendRequest from "./sendRequest";

const BASE_URL = "/api";

export async function create(stockId, noteData) {
  return sendRequest(`${BASE_URL}/stocks/${stockId}/notes`, "POST", noteData);
}

export async function update(noteId, noteData) {
  return sendRequest(`${BASE_URL}/notes/${noteId}`, "PUT", noteData);
}

export async function deleteNote(noteId) {
  return sendRequest(`${BASE_URL}/notes/${noteId}`, "DELETE");
}
