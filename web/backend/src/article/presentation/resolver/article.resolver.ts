import { Param } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { ArticleDto } from '../dto/article.dto'

@Resolver(() => ArticleDto)
export class ArticlesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ArticleDto])
  async articles(@Param() params: { categoryId: number }) {
    const condition = params.categoryId
      ? { categoryId: params.categoryId }
      : undefined
    return this.prisma.article.findMany({
      include: { author: { include: { university: true } }, category: true },
      where: condition,
    })
  }

  @Mutation(() => ArticleDto)
  async createarticle(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.prisma.article.create({ data: { title, content } })
  }
}
