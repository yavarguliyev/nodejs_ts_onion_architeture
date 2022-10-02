import { ArgsType, Field, Int } from 'type-graphql'
import { IsNumber, Min } from 'class-validator'

@ArgsType()
export class DeleteUserArgs {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id: number
}
