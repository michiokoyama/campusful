import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger'
import { InputDataFileUploadResponse } from './upload.dto'
import { PrismaService } from 'src/prisma.service'
import {
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Controller,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'
import { diskStorage } from 'multer'

export const customFileIntercept = (options: {
  fieldname: string // file が乗っている body の field
  dest: string // 保存したい場所
  maxFileSize: number // 最大画像サイズ
  fileCount: number // 最大画像枚数
  allowFileTypes: string[] // 許可する画像形式
}) =>
  FileInterceptor(options.fieldname, {
    storage: diskStorage({
      destination: options.dest,
    }),
    limits: {
      fileSize: options.maxFileSize,
      files: options.fileCount,
    },
    fileFilter(
      req: any,
      file: {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        size: number
        destination: string
        filename: string
        path: string
        buffer: Buffer
      },
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) {
      if (!options.allowFileTypes.includes(file.mimetype))
        return callback(new BadRequestException('invalid file type.'), false)
      return callback(null, true)
    },
  })

@Controller('upload')
export class UploadsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, type: InputDataFileUploadResponse })
  @UseInterceptors(
    customFileIntercept({
      fieldname: 'imageFile',
      dest: 'uploads',
      maxFileSize: 5000000,  // 5MB
      fileCount: 1,
      allowFileTypes: ['image/png', 'image/jpg'],
    }),
  )
  async uploadimage(
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<InputDataFileUploadResponse> {
    console.log('######', imageFile)
    return {
      success: true,
      fileName: imageFile.filename,
    }
  }
}
