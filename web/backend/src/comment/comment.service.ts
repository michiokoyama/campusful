import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Comment, Prisma } from '@prisma/client'

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async comment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    })
  }

  async comments(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CommentWhereUniqueInput
    where?: Prisma.CommentWhereInput
    orderBy?: Prisma.CommentOrderByWithRelationInput
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    })
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput
    data: Prisma.CommentUpdateInput
  }): Promise<Comment> {
    const { where, data } = params
    return this.prisma.comment.update({
      data,
      where,
    })
  }

  async deleteComment(where: Prisma.UserWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    })
  }
}
