import { Service } from 'typedi'

import { ContainerHelper } from '../../Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from '../../Helpers/IOC/Static/ContainerItems'
import { IUnitOfWork } from '../../Core/IUnitOfWork'
import { IUserService } from '../../Core/Services/Data/IUser.Service'
import User from '../../Core/Entities/User'

@Service()
export class UserService implements IUserService {
  constructor(private unitOfWork: IUnitOfWork) {
    this.unitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)
  }

  async getAll(): Promise<User[]> {
    return await this.unitOfWork.User.getAll()
  }
}
