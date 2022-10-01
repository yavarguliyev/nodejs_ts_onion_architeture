import { Service } from 'typedi'
import { Query, Resolver } from 'type-graphql'

import User from '../Core/Entities/User'
import { UserService } from '../Service/Data/User.Service'
import { ContainerHelper } from '../Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from '../Helpers/IOC/Static/ContainerItems'

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ) {
    this.userService = ContainerHelper.get(ContainerItems.IUserService)
  }

  @Query(() => [User])
  public async getAll(): Promise<User[]> {
   return await this.userService.getAll()
  }
}
