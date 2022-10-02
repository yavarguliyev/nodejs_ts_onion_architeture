import { Service } from 'typedi'
import { hash } from 'bcrypt'

import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { BaseRepository } from 'Data/Repositories/BaseRepository'
import User from 'Core/Entities/User'

@Service()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  public async getAllUser(): Promise<User[]> {
    return (await this.repository
      .createQueryBuilder('users')
      .getMany()) as unknown as User[]
  }

  public async hashPassword(password: string): Promise<string> {
    return await hash(password, 10)
  }
}
