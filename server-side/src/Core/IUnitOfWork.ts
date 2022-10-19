import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { IRoleRepository } from 'Core/Repositories/IRole.Repository'

export interface IUnitOfWork {
  Role: IRoleRepository
  User: IUserRepository
  CommitAsync(): Promise<number>
}
