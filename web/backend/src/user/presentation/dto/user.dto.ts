import { Field, ID, ObjectType } from '@nestjs/graphql'
import { GenderType } from '@prisma/client'
import { ArticleDto } from '../../../article/presentation/dto/article.dto'
import { UniversityDto } from '../../../university/presentation/dto/university.dto'

@ObjectType('User', {
  isAbstract: true,
})
export class UserDto {
  private constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    displayName: string,
    gender: GenderType,
  ) {
    this.id = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.displayName = displayName
    this.gender = gender
  }
  static fromEntity(entity: {
    id: number
    email: string
    firstName: string
    lastName: string
    displayName: string
    gender: GenderType
  }) {
    return new UserDto(
      entity.id,
      entity.email,
      entity.firstName,
      entity.lastName,
      entity.displayName,
      entity.gender,
    )
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
  firstName!: string

  @Field(() => String, {
    nullable: false,
  })
  lastName!: string

  @Field(() => String, {
    nullable: false,
  })
  displayName!: string

  @Field(() => String, {
    nullable: false,
  })
  gender!: GenderType

  @Field(() => [ArticleDto], {
    nullable: false,
  })
  articles!: ArticleDto[]

  @Field(() => UniversityDto, {
    nullable: false,
  })
  university!: UniversityDto
}
