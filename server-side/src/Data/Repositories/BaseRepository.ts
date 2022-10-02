import { EntitySchema, Repository } from 'typeorm'
import { UserInputError } from 'apollo-server-core'

import { IBaseRepository } from 'Core/Repositories/IBaseRepository'

export class BaseRepository<TEntity> implements IBaseRepository<TEntity> {
  constructor(protected repository: Repository<EntitySchema<TEntity>>) {}

  public async getAll(): Promise<TEntity[]> {
    return (await this.repository.find()) as unknown as TEntity[]
  }

  public async getById(id: number): Promise<TEntity> {
    const _entity = await this.repository.findOne({ where: { id } })
    if (!_entity) {
      throw new UserInputError(`Entity with id: ${id} not found.`)
    }

    return _entity as unknown as TEntity
  }

  public async getByEmail(email: string): Promise<TEntity | undefined> {
    const _entity = await this.repository.findOne({ where: { email } })
    if (!_entity) {
      throw new UserInputError(`Entity with email: ${email} not found.`)
    }

    return _entity as unknown as TEntity
  }

  public async emailAlreadyExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.repository.findOne({ where: { email } })
    if (!emailAlreadyExists) return false
    return true
  }

  public async create(options: any, entity: string): Promise<TEntity> {
    const newEntity = await this.repository
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(options)
      .execute()
    const _entity = await this.getById(newEntity.generatedMaps[0].id)

    return _entity as TEntity
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

  public async delete(id: number, entity: string): Promise<boolean> {
    await this.getById(id)
    const { affected } = await this.repository.createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute()
    return affected !== 0
  }
}
