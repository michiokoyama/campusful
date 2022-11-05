import { ApiProperty } from '@nestjs/swagger'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Upload', {
  isAbstract: true,
})
export class UploadDto {
  private constructor(fileUrl: string) {
    this.fileUrl = fileUrl
  }
  static fromEntity(entity: { fileUrl: string }) {
    return new UploadDto(entity.fileUrl)
  }

  @Field(() => String, {
    nullable: false,
  })
  fileUrl!: string
}

export class InputDataFileUploadResponse {
  @ApiProperty({ type: Boolean })
  readonly success!: boolean
  readonly fileName!: string
}
