export interface IBaseRepository<TEntity> {
  getAll(): Promise<TEntity[]>
  getById(id: number): Promise<TEntity>
  getByEmail(email: string): Promise<TEntity | undefined>
  emailAlreadyExists(email: string): Promise<boolean>
  create (options: any, entity: string): Promise<TEntity>
  update(id: number, options: any, entity: string): Promise<TEntity>
  delete(id: number, entity: string): Promise<boolean>
}
