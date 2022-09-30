import { ContainerHelper } from './Helpers/ContainerHelper'
import { ContainerItems } from './Static/ContainerItems'
import { IUserService } from '../../Core/Services/Data/IUser.Service'
import { UserService } from '../../Service/Data/User.Service'

export function configureServices() {
  ContainerHelper.addSingleton<IUserService>(ContainerItems.IUserService, UserService)
}
