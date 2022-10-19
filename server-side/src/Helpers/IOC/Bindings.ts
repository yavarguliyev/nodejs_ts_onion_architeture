import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { IUserService } from 'Core/Services/Data/IUser.Service'
import { UserService } from 'Service/Data/User.Service'
import { IUnitOfWork } from 'Core/IUnitOfWork'
import { UnitOfWork } from 'Data/UnitOfWork'
import { IRoleService } from 'Core/Services/Data/IRole.Service'
import { RoleService } from 'Service/Data/Role.Service'

export function configureServices() {
  ContainerHelper
    .addSingleton<IUnitOfWork>(ContainerItems.IUnitOfWork, UnitOfWork)
    .addSingleton<IRoleService>(ContainerItems.IRoleService, RoleService)
    .addSingleton<IUserService>(ContainerItems.IUserService, UserService)
}
