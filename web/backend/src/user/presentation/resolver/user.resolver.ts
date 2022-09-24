import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GenderType } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from '../dto/user.dto'

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [UserDto])
  async user() {
    return this.prisma.user.findMany({
      include: { articles: true, university: true },
    })
  }

  @Mutation(() => UserDto)
  async createuser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('gender') gender: GenderType,
    @Args('email') email: string,
  ) {
    return this.prisma.user.create({
      data: { firstName, lastName, gender, email },
    })
  }
}
