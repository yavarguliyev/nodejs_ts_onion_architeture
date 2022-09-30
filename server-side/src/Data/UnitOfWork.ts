import { Service } from 'typedi'

import { IUnitOfWork } from '../Core/IUnitOfWork'
import { IUserRepository } from '../Core/Repositories/IUser.Repository'
import { UserRepository } from './Repositories/User.Repository'

@Service()
export class UnitOfWork implements IUnitOfWork {
  constructor(private _userRepository: IUserRepository) {
    this.User = _userRepository
  }

  User: IUserRepository = new UserRepository()

  async CommitAsync(): Promise<number> {
    return 0
  }
}
