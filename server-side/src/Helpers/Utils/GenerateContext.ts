import { Request } from 'express'
import passport from 'passport'
import { AuthenticationError } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'

import { AppContext } from 'Helpers/Utils/WithExpressContext'
import User from 'Core/Entities/User'

export const getRequestedUser = (req: Request): Promise<User> =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false, failureFlash: true, failWithError: true },
      (err, payload, info) => {
        if (err) {
          reject(err)
        }
        if (payload) {
          resolve(payload)
        }
        if (info) {
          reject(new AuthenticationError(info))
        }
      }
    )(req)
  })

export const generateContext = async (expressContext: ExpressContext) => {
  const { req, res } = expressContext
  const user = await getRequestedUser(req)
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : ''
  const context: AppContext = { req, res, user, token }

  return context
}
