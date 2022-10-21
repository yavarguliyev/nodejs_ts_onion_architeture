import { IBaseRepository } from 'Core/Repositories/IBase.Repository'
import User from 'Core/Entities/User'
import { LoginResponse } from 'Helpers/Utils/LoginResponse'

export interface IAuthRepository extends IBaseRepository<User> {
  login: (email: string, password: string) => Promise<LoginResponse>
  currentUser: (email: string) => Promise<User>
}
