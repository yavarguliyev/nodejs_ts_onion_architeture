import { Request, Response } from 'express'
import { ContextFunction } from 'apollo-server-core'

import User from 'Core/Entities/User'

export interface AppContext {
  req?: Request
  res?: Response
  user: User
  token: string
}

export interface WithExpressContext extends ContextFunction, AppContext {
  req: Request
  res: Response
}
