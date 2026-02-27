import type { Link } from "../types";
import { api } from "./api";

export async function getLinks(): Promise<Link[]> {
  const response = await api.get<Link[]>("/links");

  return response.data;
}
