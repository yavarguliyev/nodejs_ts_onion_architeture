import { Service } from 'typedi'
import { UserInputError } from 'apollo-server-core'

import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IUserService } from 'Core/Services/Data/IUser.Service'
import User from 'Core/Entities/User'

@Service()
export class UserService implements IUserService {
  constructor(private unitOfWork: IUnitOfWork) {
    this.unitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)
  }

  public async getAllUser(): Promise<User[]> {
    return await this.unitOfWork.User.getAllUser()
  }

  public async getUserById(id: number): Promise<User> {
    return await this.unitOfWork.User.getById(id)
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.unitOfWork.User.getByEmail(email)
  }

  public async addUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
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
      password: await this.unitOfWork.User.hashPassword(password)
    }, 'users')
  }

  public async updateUser(id: number, firstName: string, lastName: string): Promise<User> {
    return await this.unitOfWork.User.update(id, {
      updatedAt: new Date(),
      firstName,
      lastName
    }, 'users')
  }

  public async removeUser(id: number): Promise<boolean> {
    return await this.unitOfWork.User.remove(id, 'users')
  }
}
