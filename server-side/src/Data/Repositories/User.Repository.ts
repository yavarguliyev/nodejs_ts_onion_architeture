import { Service } from 'typedi'

import { IUserRepository } from 'Core/Repositories/IUser.Repository'
import { BaseRepository } from 'Data/Repositories/BaseRepository'
import User from 'Core/Entities/User'

@Service()
export class UserRepository extends BaseRepository<User> implements IUserRepository { }
