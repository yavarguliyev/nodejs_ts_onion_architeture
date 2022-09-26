import { injectable } from 'inversify'

import { IUserRepository } from '../../Core/Repositories/IUser.Repository'
import { Repository } from './Repository'

@injectable()
export class UserRepository extends Repository<any> implements IUserRepository {}
