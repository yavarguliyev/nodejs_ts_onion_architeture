import { Service } from 'typedi'

import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IAuthService } from 'Core/Services/Data/IAuth.Service'
import User from 'Core/Entities/User'

@Service()
export class AuthService implements IAuthService {
  constructor(
    private unitOfWork: IUnitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)
  ) {}

  public async login(email: string, password: string): Promise<User> {
    const user = await this.unitOfWork.Auth.login(email, password)
    return await this.unitOfWork.Auth.update(user.id, { token: user.token }, 'users')
  }

  public async currentUser(email: string): Promise<User> {
    return await this.unitOfWork.Auth.currentUser(email)
  }
}
