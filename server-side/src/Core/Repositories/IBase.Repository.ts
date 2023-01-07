import { EntitySchema } from 'typeorm'

export interface IBaseRepository<TEntity> {
  getMany(entity: string): Promise<EntitySchema<TEntity>[]>
  findOne(id: number): Promise<EntitySchema<TEntity>>
  findOneOrFail(prop: any): Promise<EntitySchema<TEntity>>
  create(options: any, entity: string): Promise<EntitySchema<TEntity>>
  update(id: number, options: any, entity: string): Promise<EntitySchema<TEntity>>
  delete(id: number, entity: string): Promise<boolean>
}
