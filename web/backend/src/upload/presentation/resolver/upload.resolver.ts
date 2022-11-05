import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UploadDto } from '../dto/upload.dto'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const GraphQLUpload = import('graphql-upload/GraphQLUpload.mjs').then(
//   (res) => res.GraphQLUpload,
// )
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import FileUpload from 'graphql-upload/processRequest.mjs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const FileUpload = require('graphql-upload/Upload.mjs')
// const FileUpload = import('graphql-upload/processRequest.mjs').then(
//   (res) => res.FileUpload,
// )
import { createWriteStream } from 'fs'
import { PrismaService } from 'src/prisma.service'

@Resolver(() => UploadDto)
export class UploadsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Boolean)
  async uploadimage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: typeof FileUpload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    )
  }
}
