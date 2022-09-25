import { controller, httpGet } from "inversify-express-utils";
import { BaseApiController } from "./BaseApiController";

@controller('/api/v1/users')
export class UserController extends BaseApiController {
  @httpGet('/')
  async getAllUsers() {
    return this.userService.get()
  }
}