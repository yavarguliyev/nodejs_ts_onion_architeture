import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { IRoleRepository } from 'Core/Repositories/IRole.Repository'
import { IAuthRepository } from 'Core/Repositories/IAuth.Repository'

export interface IUnitOfWork {
  Role: IRoleRepository
  Auth: IAuthRepository
  User: IUserRepository
}
