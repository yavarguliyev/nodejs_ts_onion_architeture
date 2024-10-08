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
  constructor (
    private unitOfWork: IUnitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)
  ) {}

  public async getMany (): Promise<User[]> {
    return await this.unitOfWork.User.getMany('users') as unknown as User[]
  }

  public async findOne (id: number): Promise<User> {
    return await this.unitOfWork.User.findOne(id) as unknown as User
  }

  public async findOneByEmail (email: string): Promise<User | undefined> {
    return await this.unitOfWork.User.findOneByEmail(email)
  }

  public async create (
    email: string, firstName: string, lastName: string, gender: Gender, password: string, role: Roles
  ): Promise<User> {
    if (await this.unitOfWork.User.findOneExistingEmail(email)) {
      throw new UserInputError('There is already a registered user with this email address.')
    }
    return await this.unitOfWork.User.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      firstName,
      lastName,
      gender,
      password: await this.unitOfWork.User.hashPassword(password),
      role: await this.unitOfWork.Role.findOneOrFail({ name: role })
    }, 'users') as unknown as User
  }

  public async update (id: number, firstName: string, lastName: string): Promise<User> {
    return await this.unitOfWork.User.update(id, {
      updatedAt: new Date(), firstName, lastName
    }, 'users') as unknown as User
  }

  public async delete (id: number): Promise<boolean> {
    return await this.unitOfWork.User.delete(id, 'users')
  }
}
