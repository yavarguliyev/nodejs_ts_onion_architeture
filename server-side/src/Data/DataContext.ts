import { Service } from 'typedi'
import { getConnectionOptions, ConnectionOptions } from 'typeorm'

import { config } from 'Helpers/Config/main'
import User from 'Core/Entities/User'

const { DB_CONNECTION } = config

export interface IDBContextOptionsFactory {
  create(): Promise<ConnectionOptions>
}

@Service()
export class DBContextOptionsFactory implements IDBContextOptionsFactory {
  public async create(): Promise<ConnectionOptions> {
    const connectionOptions = await getConnectionOptions(DB_CONNECTION)
    if (
      typeof connectionOptions.entities !== 'undefined' &&
      connectionOptions.entities.length === 0
    ) {
      connectionOptions.entities.push(User)
    }

    return connectionOptions
  }
}
