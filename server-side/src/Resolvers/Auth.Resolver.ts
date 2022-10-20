import { Service } from 'typedi'
import { Args, Mutation, Resolver } from 'type-graphql'

import { ContainerHelper } from 'Helpers/IOC/Helpers/ContainerHelper'
import { ContainerItems } from 'Helpers/IOC/Static/ContainerItems'
import { AuthService } from 'Services/Data/Auth.Service'
import { LoginUserArgs } from 'Helpers/Inputs/User/LoginUserArgs'
import User from 'Core/Entities/User'

@Service()
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
    this.authService = ContainerHelper.get(ContainerItems.IAuthService)
  }

  @Mutation(() => User)
  public async login(@Args() { email, password }: LoginUserArgs): Promise<User> {
    return await this.authService.login(email.toLowerCase(), password)
  }
}
