import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { ArticleDto } from '../../../article/presentation/dto/article.dto'
import { UserDto } from '../../../user/presentation/dto/user.dto'

@ObjectType('Comment', {
  isAbstract: true,
})
export class CommentDto {
  private constructor(id: number, content: string) {
    this.id = id
    this.content = content
  }
  static fromEntity(entity: { id: number; content: string }) {
    return new CommentDto(entity.id, entity.content)
  }

  @Field(() => ID, {
    nullable: false,
  })
  id!: number

  @Field(() => String, {
    nullable: false,
  })
  content!: string

  @Field(() => [ArticleDto], {
    nullable: false,
  })
  article!: ArticleDto

  @Field(() => UserDto, {
    nullable: true,
  })
  author!: UserDto

  @Field(() => GraphQLISODateTime, {
    nullable: false,
  })
  createdAt!: Date
}
