import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UploadService } from './upload.service'
import { UploadsController } from './presentation/controller/upload.controller'

@Module({
  imports: [],
  controllers: [UploadsController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
