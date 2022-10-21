import { Container } from 'typedi'
import { useContainer, ConnectionManager } from 'typeorm'
import express from 'express'
import cors from 'cors'
import http from 'http'
import passport from 'passport'

import { config } from 'Helpers/Config/main'
import { DBContextOptionsFactory } from 'Data/DataContext'
import { configureServices } from 'Helpers/IOC/Bindings'
import { ApolloServerService } from 'Helpers/Infrastructure/ApolloServer.Service'
import { AuthStrategyFactoryServie } from 'Helpers/Infrastructure/AuthStrategyFactory.Service'
import router from 'Helpers/Routes/Routes'

const { NODE_PORT, NODE_ENV } = config

const initialize = async () => {
  Container.set({ id: ConnectionManager, type: ConnectionManager })
  useContainer(Container)

  const connectionOptions = await Container.get(DBContextOptionsFactory).create()

  await Container.get(ConnectionManager).create({ ...connectionOptions }).connect()

  const authStrategies = Container.get(AuthStrategyFactoryServie).buildStrategies()

  for (const strategy of authStrategies) {
    passport.use(strategy)
  }

  const apolloServer = await Container.get(ApolloServerService).get()

  const app = express()

  app.use(express.json())

  app.use(cors({ credentials: true }))

  app.use(router)

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  const httpServer = http.createServer(app)

  httpServer.listen({ port: NODE_PORT }, () =>
    // eslint-disable-next-line no-console
    console.log(
      `=== 🕵  Server️ running in ${NODE_ENV} mode on port http://localhost:${NODE_PORT}/graphql ===`
    )
  )

  configureServices()
}

export { initialize }
