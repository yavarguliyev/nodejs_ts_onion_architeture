import { ArgsType, Field } from 'type-graphql'
import { IsEmail, Length, Matches } from 'class-validator'

import {
  EMAIL_MAX_LENGTH_CONSTRAINT,
  EMAIL_MIN_LENGTH_CONSTRAINT,
  PASSWORD_REGEXP
} from 'Helpers/Dictionaries/UserManagement'

@ArgsType()
export class LoginUserArgs {
  @Field()
  @IsEmail({ }, { message: 'Should be valid email address.' })
  @Length(EMAIL_MIN_LENGTH_CONSTRAINT, EMAIL_MAX_LENGTH_CONSTRAINT, {
    message: 'Maximum number of allowed characters is 128.'
  })
  public email: string

  @Field()
  @Matches(PASSWORD_REGEXP, {
    message: 'Password should contain at least 8 characters with uppercase, lowercase and numbers.'
  })
  public password: string
}
