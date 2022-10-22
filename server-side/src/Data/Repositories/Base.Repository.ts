import { Repository, ObjectLiteral, EntitySchema } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserInputError } from 'apollo-server-core'

import { IBaseRepository } from 'Core/Repositories/IBase.Repository'
import { config } from 'Helpers/Config/main'

const { DB_CONNECTION } = config

export class BaseRepository<TEntity extends ObjectLiteral> implements IBaseRepository<TEntity> {
  constructor(@InjectRepository(EntitySchema<TEntity>, DB_CONNECTION) protected repository: Repository<TEntity>) {}

  public getAll = async (entity: string): Promise<EntitySchema<TEntity>[]> =>
    (await this.repository
      .createQueryBuilder(entity)
      .getMany()) as unknown as EntitySchema<TEntity>[]

  public async getById(id: number): Promise<EntitySchema<TEntity>> {
    const entity = await this.repository.findOne({ where: { id } })
    if (!entity) {
      throw new UserInputError(`Entity with id: ${id} not found.`)
    }

    return entity as unknown as EntitySchema<TEntity>
  }

  public findBy = async (prop: any): Promise<EntitySchema<TEntity>> => (await this.repository.findOneOrFail({ where: prop })) as unknown as EntitySchema<TEntity>

  public async add(options: any, entity: string): Promise<EntitySchema<TEntity>> {
    const newEntity = await this.repository
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(options)
      .execute()

    return (await this.getById(newEntity.generatedMaps[0].id)) as unknown as EntitySchema<TEntity>
  }

  public async update(id: number, options: any, entity: string): Promise<EntitySchema<TEntity>> {
    await this.getById(id)
    await this.repository
      .createQueryBuilder()
      .update(entity)
      .set(options)
      .where('id = :id', { id })
      .execute()

    return (await this.getById(id)) as unknown as EntitySchema<TEntity>
  }

  public async remove(id: number, entity: string): Promise<boolean> {
    await this.getById(id)
    const { affected } = await this.repository
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where('id = :id', { id })
      .execute()

    return affected !== 0
  }
}
