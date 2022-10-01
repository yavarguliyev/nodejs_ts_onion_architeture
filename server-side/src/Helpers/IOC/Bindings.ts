import { ContainerHelper } from './Helpers/ContainerHelper'
import { ContainerItems } from './Static/ContainerItems'
import { IUserService } from '../../Core/Services/Data/IUser.Service'
import { UserService } from '../../Service/Data/User.Service'
import { IUnitOfWork } from '../../Core/IUnitOfWork'
import { UnitOfWork } from '../../Data/UnitOfWork'

export function configureServices() {
  ContainerHelper.addSingleton<IUnitOfWork>(ContainerItems.IUnitOfWork, UnitOfWork),
  ContainerHelper.addSingleton<IUserService>(ContainerItems.IUserService, UserService)
}
