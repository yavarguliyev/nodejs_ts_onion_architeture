import { Service } from 'typedi'

import { IUnitOfWork } from '../../Core/IUnitOfWork'
import { IUserService } from '../../Core/Services/Data/IUser.Service'

@Service()
export class UserService implements IUserService {
  private readonly _unitOfWork: IUnitOfWork

  constructor(private unitOfWork: IUnitOfWork) {
    this._unitOfWork = unitOfWork
  }
}
