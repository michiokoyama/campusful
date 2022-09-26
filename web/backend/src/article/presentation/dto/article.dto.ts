import {
  Field,
  ID,
  ObjectType,
  Int,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql'
import { UserDto } from '../../../user/presentation/dto/user.dto'
import { CategoryDto } from '../../../category/presentation/dto/category.dto'
import { CommentDto } from '../../../comment/presentation/dto/comment.dto'

export const GqlArticleTypeMap = {
  Article: 'Article',
  Question: 'Question',
} as const

export type ArticleType = keyof typeof GqlArticleTypeMap

registerEnumType(GqlArticleTypeMap, {
  name: 'ArticleType',
})

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

  @Field(() => GqlArticleTypeMap, {
    nullable: false,
  })
  type!: ArticleType

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

  @Field(() => Int, {
    nullable: false,
  })
  thanksNum!: number

  @Field(() => Int, {
    nullable: false,
  })
  commentNum!: number

  @Field(() => UserDto, {
    nullable: false,
  })
  author!: UserDto

  @Field(() => CategoryDto, {
    nullable: true,
  })
  category!: CategoryDto

  @Field(() => [CommentDto], {
    nullable: true,
  })
  comments!: [CommentDto]

  @Field(() => GraphQLISODateTime, {
    nullable: false,
  })
  createdAt!: Date
}
