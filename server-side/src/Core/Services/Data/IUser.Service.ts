import User from 'Core/Entities/User'

export interface IUserService {
  getAll(): Promise<User[]>
}
