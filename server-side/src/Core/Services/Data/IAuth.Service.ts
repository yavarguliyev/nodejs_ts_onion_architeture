import User from 'Core/Entities/User'
import { LoginResponse } from 'Helpers/Utils/LoginResponse'

export interface IAuthService {
  signIn(email: string, password: string): Promise<LoginResponse>
  currentUser(email: string): Promise<User>
}
