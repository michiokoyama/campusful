import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { ArticleService } from './article/article.service';
import { User as UserModel, Article as ArticleModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: ArticleService,
  ) {}

  @Get('article/:id')
  async getPostById(@Param('id') id: string): Promise<ArticleModel> {
    return this.postService.article({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<ArticleModel[]> {
    return this.postService.articles({
      where: { published: true },
    })
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<ArticleModel[]> {
    return this.postService.articles({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('article')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<ArticleModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createArticle({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<ArticleModel> {
    return this.postService.updateArticle({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<ArticleModel> {
    return this.postService.deleteArticle({ id: Number(id) });
  }
}
