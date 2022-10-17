export interface IBaseRepository<TEntity> {
  getAll(entity: string): Promise<TEntity[]>
  getById(id: number): Promise<TEntity>
  add(options: any, entity: string): Promise<TEntity>
  update(id: number, options: any, entity: string): Promise<TEntity>
  remove(id: number, entity: string): Promise<boolean> 
}
