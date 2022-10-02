import User from 'Core/Entities/User'

export interface IUserService {
  getAllUser(): Promise<User[]>
  getUserById(id: number, user: User): Promise<User>
  getUserByEmail(email: string): Promise<User | undefined>
  createUser(email: string, firstName: string, lastName: string, password: string): Promise<User>
  updateUser(id: number, firstName: string, lastName: string): Promise<User>
}
