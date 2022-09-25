import { AsyncContainerModule, interfaces } from 'inversify';
import { IUserRepository } from '../../Core/Repositories/IUser.Repository';
import { UserRepository } from '../../Data/Repositories/User.Repository';
import { TYPES } from '../Types/types';

export const servicesContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});