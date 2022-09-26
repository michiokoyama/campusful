import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GenderType } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CommentDto } from '../dto/comment.dto'

@Resolver(() => CommentDto)
export class CommentResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [CommentDto])
  async user() {
    return this.prisma.comment.findMany({
      include: { article: true, author: true },
    })
  }

  @Mutation(() => CommentDto)
  async createcomment(
    @Args('content') content: string,
    @Args('articleId') articleId: number,
    @Args('authorId') authorId: number,
  ) {
    return this.prisma.comment.create({
      data: { content, articleId, authorId },
    })
  }
}
