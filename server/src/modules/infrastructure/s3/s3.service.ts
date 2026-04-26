import { BadRequestException, Injectable } from '@nestjs/common'
import { S3Provider } from '@src/modules/infrastructure/s3/s3.provider'
import { FileUpload, ReadStream } from 'graphql-upload-ts'

@Injectable()
export class S3Service {
  constructor(
    private readonly s3: S3Provider
  ) {}

  public async uploadImage(userId: string, file: FileUpload): Promise<string> {
    const { createReadStream, filename, mimetype } = file
    const stream: ReadStream = createReadStream()

    if (!this.validateFile(mimetype, 'image'))
      throw new BadRequestException('Неверный формат файла')

    const key = await this.s3.upload(userId, stream, filename, mimetype)

    return key
  }

  public async getImage(key: string): Promise<string> {
    const url = await this.s3.get(key)

    return url
  }

  public async updateImage(key: string, file: FileUpload): Promise<boolean> {
    const { createReadStream, mimetype } = file
    const stream: ReadStream = createReadStream()

    if (!this.validateFile(mimetype, 'image'))
      throw new BadRequestException('Неверный формат файла')

    return await this.s3.update(stream, key, mimetype)
  }

  public async delete(key: string): Promise<boolean> {
    return await this.s3.delete(key)
  }

  private validateFile(mimetype: string, mimeToken: string): boolean {
    return mimetype.startsWith(mimeToken)
  }
}