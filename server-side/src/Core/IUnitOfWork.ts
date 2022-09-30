import { IUserRepository } from './Repositories/IUser.Repository'

export interface IUnitOfWork {
  User: IUserRepository
  CommitAsync(): Promise<number>
}
