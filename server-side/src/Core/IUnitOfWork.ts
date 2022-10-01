import { IUserRepository } from 'Core/Repositories/IUser.Repository'

export interface IUnitOfWork {
  User: IUserRepository
  CommitAsync(): Promise<number>
}
