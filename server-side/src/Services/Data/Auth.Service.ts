import { Service } from 'typedi'

import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { IAuthService } from 'Core/Services/Data/IAuth.Service'
import User from 'Core/Entities/User'
import { LoginResponse } from 'Helpers/Utils/LoginResponse'

@Service()
export class AuthService implements IAuthService {
  constructor (private unitOfWork: IUnitOfWork = ContainerHelper.get<IUnitOfWork>(ContainerItems.IUnitOfWork)) {}

  public async signIn (email: string, password: string): Promise<LoginResponse> {
    return await this.unitOfWork.Auth.signIn(email, password)
  }

  public async currentUser (email: string): Promise<User> {
    return await this.unitOfWork.Auth.currentUser(email)
  }
}
