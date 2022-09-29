import { Args, Mutation, Query, Resolver, Float } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { ArticleDto, ArticleType } from '../dto/article.dto'

@Resolver(() => ArticleDto)
export class ArticlesResolver {
  constructor(private prisma: PrismaService) {}

  getCategoryCondition(categoryIds: number[]){
    return categoryIds.length > 0 ? { categoryId: { in: categoryIds } } : null
  }

  getKeywordCondition(keyword?: string){
    const keywordCondition = keyword ? { content: { contains: keyword } } : null
    return keywordCondition
  }

  @Query(() => [ArticleDto])
  async articles(
    @Args({ name: 'categoryIds', type: () => [Float] }) categoryIds: number[],
    @Args('keyword', { nullable: true }) keyword?: string,
  ) {
    const categoryCondition = this.getCategoryCondition(categoryIds)
    const keywordCondition = this.getKeywordCondition(keyword)
    return this.prisma.article.findMany({
      include: {
        author: { include: { university: true } },
        category: true,
        comments: { include: { author: { include: { university: true } } } },
      },
      where: { AND: [categoryCondition, keywordCondition] },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
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
