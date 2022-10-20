import { Repository, ObjectLiteral } from 'typeorm'
import { UserInputError } from 'apollo-server-core'

import { IBaseRepository } from 'Core/Repositories/IBase.Repository'

export class BaseRepository<TEntity extends ObjectLiteral> implements IBaseRepository<TEntity> {
  constructor(protected repository: Repository<TEntity>) { }

  public async getAll(entity: string): Promise<TEntity[]> {
    return (await this.repository
      .createQueryBuilder(entity)
      .getMany())
  }

  public async getById(id: number): Promise<TEntity> {
    const entity = await this.repository.findOne({ where: { id } })
    if (!entity) {
      throw new UserInputError(`Entity with id: ${id} not found.`)
    }

    return entity
  }

  public async findBy(prop: any): Promise<TEntity> {
    return await this.repository.findOneOrFail({ where: prop })
  }

  public async add(options: any, entity: string): Promise<TEntity> {
    const newEntity = await this.repository
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(options)
      .execute()
    
    return await this.getById(newEntity.generatedMaps[0].id) as TEntity
  }

  public async update(id: number, options: any, entity: string): Promise<TEntity> {
    await this.getById(id)

    await this.repository
      .createQueryBuilder()
      .update(entity)
      .set(options)
      .where('id = :id', { id })
      .execute()
    
    return await this.repository.findOne({ where: { id } }) as TEntity
  }

  public async remove(id: number, entity: string): Promise<boolean> {
    await this.getById(id)

    const { affected } = await this.repository.createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute()
    
    return affected !== 0
  }
}
