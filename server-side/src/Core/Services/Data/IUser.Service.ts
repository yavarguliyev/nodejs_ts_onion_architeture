import User from 'Core/Entities/User'
import { Gender } from 'Core/Enums/Gender.Enum'
import { Roles } from 'Core/Enums/Roles.Enum'

export interface IUserService {
  getMany(): Promise<User[]>
  findOne(id: number): Promise<User>
  findOneByEmail(email: string): Promise<User | undefined>
  create(email: string, firstName: string, lastName: string, gender: Gender, password: string, role: Roles): Promise<User>
  update(id: number, firstName: string, lastName: string): Promise<User>
  delete(id: number): Promise<boolean>
}
