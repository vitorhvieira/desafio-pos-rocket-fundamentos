import type { Link } from "../types";
import { api } from "./api";

export async function createLink(data: {
  originalUrl: string;
  shortUrl: string;
}): Promise<Link> {
  const response = await api.post<Link>("/links", data);
  return response.data;
}
