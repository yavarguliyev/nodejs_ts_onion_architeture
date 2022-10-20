import { Service } from 'typedi'
import { sign } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import { compare } from 'bcrypt'

import { BaseRepository } from 'Data/Repositories/Base.Repository'
import User from 'Core/Entities/User'
import { IAuthRepository } from 'Core/Repositories/IAuth.Repository'

@Service()
export class AuthRepository extends BaseRepository<User> implements IAuthRepository {
  public async login (email: string, password: string): Promise<User> {
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

    user.token = sign(payload, 'JWT_SECRET_KEY', { expiresIn: '7d' })

    return user
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
