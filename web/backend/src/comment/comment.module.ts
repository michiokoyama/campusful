import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CommentService } from './comment.service'

@Module({
  imports: [],
  controllers: [],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
