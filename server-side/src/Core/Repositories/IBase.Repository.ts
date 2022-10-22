import { EntitySchema } from 'typeorm'

export interface IBaseRepository<TEntity> {
  getAll(entity: string): Promise<EntitySchema<TEntity>[]>
  getById(id: number): Promise<EntitySchema<TEntity>>
  findBy(prop: any): Promise<EntitySchema<TEntity>>
  add(options: any, entity: string): Promise<EntitySchema<TEntity>>
  update(id: number, options: any, entity: string): Promise<EntitySchema<TEntity>>
  remove(id: number, entity: string): Promise<boolean> 
}
