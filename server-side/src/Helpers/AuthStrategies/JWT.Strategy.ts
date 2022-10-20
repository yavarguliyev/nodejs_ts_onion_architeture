import { ExtractJwt, Strategy } from 'passport-jwt'

import { IUnitOfWork } from 'Core/IUnitOfWork'

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'JWT_SECRET_KEY'
}

const jwtStrategy = (strategies: Strategy[], unitOfWork: IUnitOfWork): void => {
  strategies.push(new Strategy(jwtStrategyOptions, async (payload, done) => {
    const user = await unitOfWork.User.getByEmail(payload.email)
    if (!user) {
      return done(null, false, 'Unauthorized')
    }

    done(null, user)
  }))
}

export default jwtStrategy
