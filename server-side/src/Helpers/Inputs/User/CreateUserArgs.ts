import { ArgsType, Field } from 'type-graphql'
import { IsEmail, Length, Matches } from 'class-validator'

import {
  EMAIL_MAX_LENGTH_CONSTRAINT,
  EMAIL_MIN_LENGTH_CONSTRAINT,
  PASSWORD_REGEXP
} from 'Helpers/Dictionaries/UserManagement'
import { Gender } from 'Core/Enums/Gender.Enum'
import { Roles } from 'Core/Enums/Roles.Enum'

@ArgsType()
export class CreateUserArgs {
  @Field()
  @IsEmail({ }, { message: 'Should be valid email address.' })
  @Length(EMAIL_MIN_LENGTH_CONSTRAINT, EMAIL_MAX_LENGTH_CONSTRAINT, {
    message: 'Maximum number of allowed characters is 128.'
  })
  public email: string

  @Field()
  @Length(1, 128, { message: 'Maximum number of allowed characters is 128.' })
  public firstName: string

  @Field()
  @Length(1, 64, { message: 'Maximum number of allowed characters is 64.' })
  public lastName: string

  @Field(() => Gender)
  @Length(3, 16, { message: 'Maximum number of allowed characters is 16.' })
  public gender: Gender

  @Field()
  @Matches(PASSWORD_REGEXP, {
    message: 'Password should contain at least 8 characters with uppercase, lowercase and numbers.'
  })
  public password: string

  @Field(() => Roles)
  @Length(3, 16, { message: 'Maximum number of allowed characters is 16.' })
  public role: Roles
}
