import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserDto } from '../../../user/presentation/dto/user.dto'

@ObjectType('Article', {
  isAbstract: true,
})
export class ArticleDto {
  private constructor(
    id: number,
    title: string,
    content: string,
    published: boolean,
  ) {
    this.id = id
    this.title = title
    this.content = content
    this.published = published
  }
  static fromEntity(entity: {
    id: number
    title: string
    content: string
    publisehd: boolean
  }) {
    return new ArticleDto(
      entity.id,
      entity.title,
      entity.content,
      entity.publisehd,
    )
  }

  @Field(() => ID, {
    nullable: false,
  })
  id!: number

  @Field(() => String, {
    nullable: false,
  })
  title!: string

  @Field(() => String, {
    nullable: false,
  })
  content!: string

  @Field(() => Boolean, {
    nullable: false,
  })
  published!: boolean

  @Field(() => UserDto, {
    nullable: false,
  })
  author!: UserDto
}
