import { Service } from 'typedi'
import { sign } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import { compare } from 'bcrypt'

import { BaseRepository } from 'Data/Repositories/Base.Repository'
import User from 'Core/Entities/User'
import { IAuthRepository } from 'Core/Repositories/IAuth.Repository'
import { config } from 'Helpers/Config/main'
import { LoginResponse } from 'Helpers/Utils/LoginResponse'

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = config

@Service()
export class AuthRepository extends BaseRepository<User> implements IAuthRepository {
  public async login (email: string, password: string): Promise<LoginResponse> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['role']
    })

    if (!user) {
      throw new AuthenticationError('Invalid credentials')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new AuthenticationError('Invalid credentials')
    }
    
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.id
    }

    const response: LoginResponse = {
      accessToken: sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN }),
      userDetails: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }

    return response
  }

  public async currentUser (email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName'],
      relations: ['role']
    })

    if (!user) {
      throw new AuthenticationError('Invalid credentials')
    }

    return user
  }
}
