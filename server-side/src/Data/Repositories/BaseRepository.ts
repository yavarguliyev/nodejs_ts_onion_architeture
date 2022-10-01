import { EntitySchema, Repository } from 'typeorm'
import { IBaseRepository } from '../../Core/Repositories/IBaseRepository'

export class BaseRepository<TEntity> implements IBaseRepository<TEntity> {
  constructor(private repository: Repository<EntitySchema<TEntity>>) { }
  
   async getAll(): Promise<TEntity[]> {
     return await this.repository.find() as TEntity[]
  }
}
