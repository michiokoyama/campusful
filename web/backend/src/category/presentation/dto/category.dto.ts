import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Category', {
  isAbstract: true,
})
export class CategoryDto {
  private constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
  static fromEntity(entity: { id: number; name: string }) {
    return new CategoryDto(entity.id, entity.name)
  }

  @Field(() => ID, {
    nullable: false,
  })
  id!: number

  @Field(() => String, {
    nullable: false,
  })
  name!: string
}
