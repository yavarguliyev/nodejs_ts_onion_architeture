import User from 'Core/Entities/User'
import { Gender } from 'Core/Enums/Gender.Enum'
import { Roles } from 'Core/Enums/Roles.Enum'

export interface IUserService {
  getAllUser(): Promise<User[]>
  getUserById(id: number): Promise<User>
  getUserByEmail(email: string): Promise<User | undefined>
  addUser(email: string, firstName: string, lastName: string, gender: Gender, password: string, role: Roles): Promise<User>
  updateUser(id: number, firstName: string, lastName: string): Promise<User>
  removeUser(id: number): Promise<boolean>
}
