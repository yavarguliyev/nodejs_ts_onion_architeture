import { inject, injectable } from "inversify";
import { TYPES } from "../../../Helpers/Types/types";
import { UserService } from "../../../Service/Data/User.Service";

@injectable()
export abstract class BaseApiController {
  constructor(
    @inject(TYPES.UserService)
    private readonly _userService: UserService
  ) { }

  protected userService: UserService = this._userService
}