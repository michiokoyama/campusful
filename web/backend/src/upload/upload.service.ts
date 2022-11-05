import { Injectable } from '@nestjs/common'
// import { FileUpload } from 'graphql-upload'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  /*
  async upload(
    parent,
    { file }: { file: Promise<FileUpload>}
  ): Promise<null> {
    const { createReadStream, filename, mimetype, encoding } = await file
  }
  */
}
