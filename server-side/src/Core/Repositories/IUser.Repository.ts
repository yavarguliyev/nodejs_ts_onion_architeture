import User from '../Entities/User'
import { IRepository } from './IRepository'

export interface IUserRepository extends IRepository<User> {}
