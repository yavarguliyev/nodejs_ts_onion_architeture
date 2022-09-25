import { inject, injectable } from 'inversify'
import { IUnitOfWork } from '../Core/IUnitOfWork'
import { IUserRepository } from '../Core/Repositories/IUser.Repository'
import { TYPES } from '../Helpers/Types/types'
import { UserRepository } from './Repositories/User.Repository'

@injectable()
export class UnitOfWork implements IUnitOfWork {
  constructor(
    @inject(TYPES.UserRepository)
    public _User: IUserRepository 
  ) { 
    this.User = _User
  }

  User: IUserRepository = new UserRepository()

  async CommitAsync(): Promise<number> {
    return 0
  }
}