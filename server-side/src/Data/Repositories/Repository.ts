import { IRepository } from '../../Core/Repositories/IRepository'

export class Repository<T> implements IRepository<T> {
  findAll(): Promise<T[]> {
    return [] as any
  }
}
