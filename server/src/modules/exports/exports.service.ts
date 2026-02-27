import { S3ServiceException } from "@aws-sdk/client-s3";
import { ILinks } from "../links/links.interface.js";
import { IStorage } from "./storage.interface.js";
import crypto from "node:crypto";
import { AppError } from "@/errors/error.js";

export class ExportsService {
  constructor(
    private storage: IStorage,
    private repository: ILinks,
  ) {}

  async exportLinks(): Promise<string> {
    try {
      const data = await this.repository.findAll();
      const header = "originalUrl,shortUrl,accessCount,createdAt";
      const rows = data.map((link) => {
        return `${link.originalUrl},${link.shortUrl},${link.accessCount},${link.createdAt.toISOString()}`;
      });
      const csvContent = [header, ...rows].join("\n");
      const fileRandomName = crypto.randomUUID() + ".csv";

      return await this.storage.uploadStorage(
        csvContent,
        fileRandomName,
        "text/csv",
      );
    } catch (error) {
      if (error instanceof S3ServiceException) {
        throw new AppError("Falha no armazenamento!", 503);
      }
      throw error;
    }
  }
}
