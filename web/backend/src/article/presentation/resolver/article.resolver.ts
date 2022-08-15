import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { ArticleDto } from '../dto/article.dto'

@Resolver(() => ArticleDto)
export class ArticlesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ArticleDto])
  async articles() {
    return this.prisma.article.findMany()
  }

  @Mutation(() => ArticleDto)
  async createarticle(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.prisma.article.create({ data: { title, content } })
  }
}
