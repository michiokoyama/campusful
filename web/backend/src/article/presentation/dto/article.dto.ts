import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Article', {
  isAbstract: true,
})
export class ArticleDto {
  private constructor(title: string, content: string) {
    this.title = title
    this.content = content
  }
  static fromEntity(entity: { title: string; content: string }) {
    return new ArticleDto(entity.title, entity.content)
  }

  @Field(() => String, {
    nullable: false,
  })
  title!: string

  @Field(() => String, {
    nullable: false,
  })
  content!: string
}