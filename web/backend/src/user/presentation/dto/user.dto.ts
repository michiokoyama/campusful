import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('User', {
  isAbstract: true,
})
export class UserDto {
  private constructor(id: number, email: string, name: string) {
    this.id = id
    this.email = email
    this.name = name
  }
  static fromEntity(entity: { id: number; email: string; name: string }) {
    return new UserDto(entity.id, entity.email, entity.name)
  }

  @Field(() => ID, {
    nullable: false,
  })
  id!: number

  @Field(() => String, {
    nullable: false,
  })
  email!: string

  @Field(() => String, {
    nullable: false,
  })
  name!: string
}
