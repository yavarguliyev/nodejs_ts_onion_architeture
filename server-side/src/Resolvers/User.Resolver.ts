import { Service } from 'typedi'
import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql'

import User from 'Core/Entities/User'
import { UserService } from 'Services/Data/User.Service'
import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { GetUserByIdArgs } from 'Helpers/Inputs/User/GetUserByIdArgs'
import { GetUserByEmailArgs } from 'Helpers/Inputs/User/GetUserByEmailArgs'
import { CreateUserArgs } from 'Helpers/Inputs/User/CreateUserArgs'
import { UpdateUserArgs } from 'Helpers/Inputs/User/UpdateUserArgs'
import { DeleteUserArgs } from 'Helpers/Inputs/User/DeleteUserArgs'
import { Roles } from 'Core/Enums/Roles.Enum'

@Service()
@Resolver()
export class UserResolver {
  constructor (private userService: UserService) {
    this.userService = ContainerHelper.get(ContainerItems.IUserService)
  }

  @Query(() => [User])
  public async getManyUsers (): Promise<User[]> {
   return await this.userService.getMany()
  }

  @Authorized([Roles.GlobalAdmin])
  @Query(() => User)
  public async findOneUser (@Args() { id }: GetUserByIdArgs) {
    return await this.userService.findOne(id)
  }

  @Query(() => User)
  public async findOneUserByEmail (@Args() { email }: GetUserByEmailArgs): Promise<User | undefined> {
    return await this.userService.findOneByEmail(email)
  }

  @Mutation(() => User)
  public async createUser (@Args() { email, firstName, lastName, gender, password, role }: CreateUserArgs): Promise<User> {
    return await this.userService.create(email.toLowerCase(), firstName, lastName, gender, password, role)
  }

  @Mutation(() => User)
  public async updateUser (@Args() { id, firstName, lastName }: UpdateUserArgs): Promise<User> {
    return await this.userService.update(id, firstName, lastName)
  }

  @Mutation(() => Boolean)
  public async deleteUser (@Args() { id }: DeleteUserArgs): Promise<boolean> {
    return await this.userService.delete(id)
  }
}
