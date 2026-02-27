import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '@/config/env.js'
import { IStorage } from '@/modules/exports/storage.interface.js'

export class R2Storage implements IStorage {
  private client: S3Client
  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    })
  }

  async uploadStorage(
    content: string,
    filename: string,
    contentType: string
  ): Promise<string> {
    const object = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: filename,
      Body: content,
      ContentType: contentType,
      ContentDisposition: 'attachment; filename=links.csv',
    })
    await this.client.send(object)
    return env.CLOUDFLARE_PUBLIC_URL + '/' + filename
  }
}
