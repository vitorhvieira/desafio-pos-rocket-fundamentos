export interface IStorage {
  uploadStorage(
    content: string,
    filename: string,
    contentType: string,
  ): Promise<string>;
}
