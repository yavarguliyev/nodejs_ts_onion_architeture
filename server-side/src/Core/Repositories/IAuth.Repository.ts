import { IBaseRepository } from 'Core/Repositories/IBase.Repository'
import User from 'Core/Entities/User'

export interface IAuthRepository extends IBaseRepository<User> {
  login: (email: string, password: string) => Promise<User>
  currentUser: (email: string) => Promise<User>
}
