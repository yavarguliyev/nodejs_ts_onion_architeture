import { Service } from 'typedi'
import { UserInputError } from 'apollo-server-core'

import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IUserService } from 'Core/Services/Data/IUser.Service'
import User from 'Core/Entities/User'
import { Gender } from 'Core/Enums/Gender.Enum'
import { Roles } from 'Core/Enums/Roles.Enum'

@Service()
export class UserService implements IUserService {
  constructor(
    private unitOfWork: IUnitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)
  ) {}

  public getAllUser = async (): Promise<User[]> => await this.unitOfWork.User.getAll('users') as unknown as User[]

  public getUserById = async (id: number): Promise<User> => await this.unitOfWork.User.getById(id) as unknown as User

  public getUserByEmail = async (email: string): Promise<User | undefined> => await this.unitOfWork.User.getByEmail(email)

  public async addUser(
    email: string,
    firstName: string,
    lastName: string,
    gender: Gender,
    password: string,
    role: Roles
  ): Promise<User> {
    if (await this.unitOfWork.User.emailAlreadyExists(email)) {
      throw new UserInputError('There is already a registered user with this email address.')
    }

    return await this.unitOfWork.User.add({
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      firstName,
      lastName,
      gender,
      password: await this.unitOfWork.User.hashPassword(password),
      role: await this.unitOfWork.Role.findBy({ name: role })
    }, 'users') as unknown as User
  }

  public updateUser = async (id: number, firstName: string, lastName: string): Promise<User> => await this.unitOfWork.User.update(id, {
    updatedAt: new Date(),
    firstName,
    lastName
  }, 'users') as unknown as User

  public removeUser = async (id: number): Promise<boolean> => await this.unitOfWork.User.remove(id, 'users')
}
