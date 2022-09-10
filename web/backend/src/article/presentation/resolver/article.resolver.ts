import { Args, Mutation, Query, Resolver, Float } from '@nestjs/graphql'
import { create } from 'domain'
import { PrismaService } from 'src/prisma.service'
import { ArticleDto, ArticleType } from '../dto/article.dto'

@Resolver(() => ArticleDto)
export class ArticlesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ArticleDto])
  async articles(
    @Args({ name: 'categoryIds', type: () => [Float] }) categoryIds: number[],
  ) {
    const condition =
      categoryIds.length > 0 ? { categoryId: { in: categoryIds } } : undefined
    return this.prisma.article.findMany({
      include: { author: { include: { university: true } }, category: true },
      where: condition,
    })
  }

  @Mutation(() => ArticleDto)
  async createarticle(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('type') type: ArticleType,
    @Args('categoryId') categoryId: number,
    @Args('authorId') authorId: number,
  ) {
    return this.prisma.article.create({
      data: {
        title,
        content,
        type,
        category: { connect: { id: categoryId } },
        author: { connect: { id: authorId } },
      },
    })
  }
}
