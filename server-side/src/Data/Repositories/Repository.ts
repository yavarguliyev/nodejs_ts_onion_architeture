import { injectable } from 'inversify'

import { IRepository } from '../../Core/Repositories/IRepository'

@injectable()
export class Repository<T> implements IRepository<T> {
  findAll (): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  findOneById (id: string): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  doesExists (id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  save (entity: T): Promise<void> {
    throw new Error('Method not implemented.')
  }

  update (id: string, entity: T): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
