import { Inject, Service } from 'typedi'
import { Strategy } from 'passport-jwt'

import { authStrategies, AuthStrategyTypes } from 'Helpers/AuthStrategies/Auth.Strategy'
import { UnitOfWork } from 'Data/UnitOfWork'

@Service()
export class AuthStrategyFactoryServie {
  constructor (
    @Inject(() => UnitOfWork)
    private unitOfWork: UnitOfWork
  ) { }

  buildStrategies (): Strategy[] {
    const strategies: Strategy[] = []

    for (const strategyType of AuthStrategyTypes) {
      authStrategies[strategyType](strategies, this.unitOfWork)
    }

    return strategies
  }
}
