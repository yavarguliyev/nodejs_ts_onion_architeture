import { AsyncContainerModule, interfaces } from 'inversify';
import { UserService } from '../../Service/Data/User.Service';
import { TYPES } from '../Types/types';

export const repositoriesContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<UserService>(TYPES.UserService).to(UserService);
});