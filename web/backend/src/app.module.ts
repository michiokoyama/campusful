import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [ArticleModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService, ArticleService, PrismaService],
})
export class AppModule {}
