import { Service } from 'typedi'
import { UserInputError } from 'apollo-server-core'
import { hash } from 'bcrypt'

import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { BaseRepository } from 'Data/Repositories/Base.Repository'
import User from 'Core/Entities/User'

@Service()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  public async findOneByEmail (email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email }, relations: ['role'] })
    if (!user) {
      throw new UserInputError(`User with email: ${email} not found.`)
    }

    return user
  }

  public async findOneExistingEmail (email: string): Promise<boolean> {
    return !!await this.repository.findOne({ where: { email } })
  }

  public async hashPassword (password: string): Promise<string> {
    return await hash(password, 10)
  }
}
