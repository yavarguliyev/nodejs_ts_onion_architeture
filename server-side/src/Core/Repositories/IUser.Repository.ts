import { IBaseRepository } from 'Core/Repositories/IBase.Repository'
import User from 'Core/Entities/User'

export interface IUserRepository extends IBaseRepository<User> {
  findOneByEmail(email: string): Promise<User | undefined>
  findOneExistingEmail(email: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
}
