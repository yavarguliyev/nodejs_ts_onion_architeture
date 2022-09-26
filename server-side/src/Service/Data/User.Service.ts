import { inject, injectable } from 'inversify'

import { IUnitOfWork } from '../../Core/IUnitOfWork'
import { IUserService } from '../../Core/Services/Data/IUser.Service'
import { TYPES } from '../../Helpers/Types/types'

@injectable()
export class UserService implements IUserService {
  private readonly _unitOfWork: IUnitOfWork

  constructor (
    @inject(TYPES.UnitOfWork)
      unitOfWork: IUnitOfWork
  ) {
    this._unitOfWork = unitOfWork
  }

  get () {
    return this._unitOfWork.User.findAll()
  }
}
