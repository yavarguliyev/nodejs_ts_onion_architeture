import { IBaseRepository } from 'Core/Repositories/IBase.Repository'
import User from 'Core/Entities/User'

export interface IUserRepository extends IBaseRepository<User> {
  getByEmail(email: string): Promise<User | undefined>
  emailAlreadyExists(email: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
}
