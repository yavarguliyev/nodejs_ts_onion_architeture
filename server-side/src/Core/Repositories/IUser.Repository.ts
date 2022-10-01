import User from '../Entities/User'
import { IBaseRepository } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<User> { }
