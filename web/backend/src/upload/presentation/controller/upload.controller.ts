import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger'
import { InputDataFileUploadResponse, UploadDto } from './upload.dto'
import { PrismaService } from 'src/prisma.service'
import {
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Controller,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'

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
  @UseInterceptors(FileInterceptor('imageFile'))
  async uploadimage(
    @UploadedFile() imageFile: Express.Multer.File,
    // ): Promise<InputDataFileUploadResponse> {
  ): Promise<boolean> {
    console.log("######", imageFile)
    return true
  }
}
