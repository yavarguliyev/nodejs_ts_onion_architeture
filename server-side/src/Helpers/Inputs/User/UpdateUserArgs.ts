import { IsNumber, Length, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class UpdateUserArgs {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id: number

  @Field()
  @Length(2, 64, { message: 'Maximum number of allowed characters is 64.' })
  public firstName: string

  @Field()
  @Length(2, 64, { message: 'Maximum number of allowed characters is 64.' })
  public lastName: string
}
