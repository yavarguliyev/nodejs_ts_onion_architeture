import { Strategy } from 'passport-jwt'

import jwtStrategy from 'Helpers/AuthStrategies/JWT.Strategy'
import { IUnitOfWork } from 'Core/IUnitOfWork'

const AuthStrategyTypes = ['jwtStrategy']

const authStrategies: Record<
  string,
  (
    strategies: Strategy[],
    unitOfWork: IUnitOfWork
  ) => void
> = {
  jwtStrategy
}

export { authStrategies, AuthStrategyTypes }
