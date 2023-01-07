import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUserService } from 'Core/Services/Data/IUser.Service'
import { UserService } from 'Services/Data/User.Service'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { UnitOfWork } from 'Data/UnitOfWork'
import { IRoleService } from 'Core/Services/Data/IRole.Service'
import { RoleService } from 'Services/Data/Role.Service'
import { AuthService } from 'Services/Data/Auth.Service'
import { IAuthService } from 'Core/Services/Data/IAuth.Service'

export function configureServices () {
  ContainerHelper
    .addSingleton<IUnitOfWork>(ContainerItems.IUnitOfWork, UnitOfWork)
    .addSingleton<IRoleService>(ContainerItems.IRoleService, RoleService)
    .addSingleton<IUserService>(ContainerItems.IUserService, UserService)
    .addSingleton<IAuthService>(ContainerItems.IAuthService, AuthService)
}
