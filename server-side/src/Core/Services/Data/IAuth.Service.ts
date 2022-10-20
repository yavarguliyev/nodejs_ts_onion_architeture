import User from 'Core/Entities/User'

export interface IAuthService { 
  login(email: string, password: string): Promise<User>
  currentUser(email: string): Promise<User>
}
