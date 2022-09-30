import { IUserRepository } from '../../Core/Repositories/IUser.Repository'
import { Repository } from './Repository'
import User from '../../Core/Entities/User'

export class UserRepository extends Repository<User> implements IUserRepository { }
