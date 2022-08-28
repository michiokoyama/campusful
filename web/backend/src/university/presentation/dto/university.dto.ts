import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('University', {
  isAbstract: true,
})
export class UniversityDto {
  private constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
  static fromEntity(entity: { id: number; name: string }) {
    return new UniversityDto(entity.id, entity.name)
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
