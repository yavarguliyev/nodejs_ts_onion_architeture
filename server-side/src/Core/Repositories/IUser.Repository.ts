import { IBaseRepository } from 'Core/Repositories/IBaseRepository'
import User from 'Core/Entities/User'

export interface IUserRepository extends IBaseRepository<User> {
  getAllUser(): Promise<User[]>
  hashPassword(password: string): Promise<string>
}
