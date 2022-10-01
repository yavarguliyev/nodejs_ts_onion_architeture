export interface IBaseRepository<TEntity> {
  getAll(): Promise<TEntity[]>
}
