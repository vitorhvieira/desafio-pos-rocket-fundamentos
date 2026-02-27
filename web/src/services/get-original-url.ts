import { api } from "./api";

export async function getOriginalUrl(shortUrl: string): Promise<{ originalUrl: string }> {
  const response = await api.get<{ originalUrl: string }>(`/${shortUrl}`);
  return response.data;
}
