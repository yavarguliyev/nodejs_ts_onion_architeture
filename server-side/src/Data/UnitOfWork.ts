import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { UserRepository } from 'Data/Repositories/User.Repository'
import User from 'Core/Entities/User'
import { config } from 'Helpers/Config/main'
import Role from 'Core/Entities/Role'
import { IRoleRepository } from 'Core/Repositories/IRole.Repository'
import { RoleRepository } from 'Data/Repositories/Role.Repository'
import { AuthRepository } from 'Data/Repositories/Auth.Repository'
import { IAuthRepository } from 'Core/Repositories/IAuth.Repository'

const { DB_CONNECTION } = config

@Service()
export class UnitOfWork implements IUnitOfWork {
  constructor(
    @InjectRepository(User, DB_CONNECTION)
    private userRepository: Repository<User>,
    @InjectRepository(Role, DB_CONNECTION)
    private roleRepository: Repository<Role>
  ) { }

  Role: IRoleRepository = new RoleRepository(this.roleRepository)
  User: IUserRepository = new UserRepository(this.userRepository)
  Auth: IAuthRepository = new AuthRepository(this.userRepository)

  async CommitAsync(): Promise<number> {
    return 0
  }
}
