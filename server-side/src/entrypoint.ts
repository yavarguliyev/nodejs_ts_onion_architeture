import { Container } from 'typedi'
import { useContainer, ConnectionManager } from 'typeorm'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { config } from './Helpers/Config/main'
import { DBContextOptionsFactory } from './Data/DataContext'
import { configureServices } from './Helpers/IOC/Bindings'

const { NODE_PORT, NODE_ENV } = config

const initialize = async () => {
  Container.set({ id: ConnectionManager, type: ConnectionManager })
  useContainer(Container)

  const connectionOptions = await Container.get(
    DBContextOptionsFactory
  ).create()

  await Container.get(ConnectionManager)
    .create({ ...connectionOptions })
    .connect()

  const app = express()

  app.use(express.json())

  app.use(
    cors({ credentials: true })
  )

  const httpServer = http.createServer(app)

  httpServer.listen({ port: NODE_PORT }, () =>
    // eslint-disable-next-line no-console
    console.log(
      `=== 🕵  Server️ running in ${NODE_ENV} mode on port http://localhost:${NODE_PORT} ===`
    )
  )

  configureServices()
}

export { initialize }
