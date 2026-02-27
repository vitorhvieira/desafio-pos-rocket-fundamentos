import { api } from "./api";

export async function exportCsv() {
  const response = await api.get<{ url: string }>("/exports/links");
  return response.data;
}
