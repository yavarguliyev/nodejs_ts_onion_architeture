import { Context, UserInputError } from 'apollo-server-core'
import { AuthChecker } from 'type-graphql'

import { WithExpressContext } from 'Helpers/Utils/WithExpressContext'

export const AuthGuard: AuthChecker<Context<WithExpressContext>> = ({ context }, roles) => {
  const { user } = context
  if (!roles.includes(user.role.name)) {
    throw new UserInputError('Unauthorized.')
  }

  return true
}
