import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { UserRepository } from 'Data/Repositories/User.Repository'
import User from 'Core/Entities/User'
import { config } from 'Helpers/Config/main'

const { DB_CONNECTION } = config

@Service()
export class UnitOfWork implements IUnitOfWork {
  constructor(
    @InjectRepository(User, DB_CONNECTION)
    private userRepository: Repository<User>
  ) { }

  User: IUserRepository = new UserRepository(this.userRepository)

  async CommitAsync(): Promise<number> {
    return 0
  }
}
