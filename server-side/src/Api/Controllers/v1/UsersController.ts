import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../../../Helpers/Types/types";
import { UserService } from "../../../Service/Data/User.Service";

@controller('/api/v1/users')
export class UserController { 
  constructor(
    @inject(TYPES.UserService)
    private readonly userService: UserService
  ) { }
  
  @httpGet('/')
  async getAllUsers() {
    return this.userService.get()
  }
}