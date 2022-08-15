import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ArticleService } from './article.service'

@Module({
  imports: [],
  controllers: [],
  providers: [ArticleService, PrismaService],
})
export class ArticleModule {}
