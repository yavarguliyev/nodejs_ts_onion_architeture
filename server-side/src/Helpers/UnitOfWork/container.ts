import { AsyncContainerModule, interfaces } from 'inversify';
import { IUnitOfWork } from '../../Core/IUnitOfWork';
import { UnitOfWork } from '../../Data/UnitOfWork';
import { TYPES } from '../Types/types';

export const unitOfWorkContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<IUnitOfWork>(TYPES.UnitOfWork).to(UnitOfWork);
});