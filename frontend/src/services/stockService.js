import sendRequest from "./sendRequest";

const BASE_URL = "/api/stocks";

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(stockData) {
  return sendRequest(BASE_URL, "POST", stockData);
}

export async function show(stockId) {
  return sendRequest(`${BASE_URL}/${stockId}`);
}
