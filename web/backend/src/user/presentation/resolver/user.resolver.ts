import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from '../dto/user.dto'

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [UserDto])
  async user() {
    return this.prisma.user.findMany({ include: { articles: true } })
  }

  @Mutation(() => UserDto)
  async createuser(@Args('name') name: string, @Args('email') email: string) {
    return this.prisma.user.create({ data: { name, email } })
  }
}
