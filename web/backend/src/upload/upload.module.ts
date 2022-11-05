import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UploadService } from './upload.service'

@Module({
  imports: [],
  controllers: [],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
