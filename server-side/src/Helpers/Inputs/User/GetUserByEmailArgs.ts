import { ArgsType, Field } from 'type-graphql'
import { IsEmail } from 'class-validator'

@ArgsType()
export class GetUserByEmailArgs {
  @Field(() => String)
  @IsEmail()
  public email: string
}
