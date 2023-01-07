import { Service, Container, Inject } from 'typedi'
import { ApolloServer, UserInputError } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { GraphQLSchema, GraphQLError, GraphQLFormattedError } from 'graphql'
import { buildSchema, ArgumentValidationError } from 'type-graphql'

import { UserResolver } from 'Resolvers/User.Resolver'
import { AuthGuard } from 'Helpers/Middlewares/AuthGuard'
import { generateContext } from 'Helpers/Utils/GenerateContext'
import LoggingPlugin from 'Helpers/Plugins/ApolloServer.Plugins'
import { LoggerService, ILoggerService } from 'Helpers/Infrastructure/Logger.Service'

export interface IApolloServerService {
  get (): Promise<ApolloServer>
}

@Service()
export class ApolloServerService implements IApolloServerService {
  private server: ApolloServer

  constructor (@Inject(() => LoggerService) private logger: ILoggerService) {}

  public async get (): Promise<ApolloServer> {
    if (!this.server) {
      this.server = await this.createServer()
    }

    return this.server
  }

  private buildSchema (): Promise<GraphQLSchema> {
    return buildSchema({
      container: Container,
      emitSchemaFile: true,
      resolvers: [
        UserResolver
      ],
      authChecker: AuthGuard
    })
  }

  private formatError (error: GraphQLError): GraphQLFormattedError {
    const hasOriginalError = typeof error.originalError !== 'undefined'

    if (hasOriginalError && error.originalError instanceof ArgumentValidationError) {
      const { message, stack, ...data } = error.originalError
      return new UserInputError(message, { stack, ...data })
    }

    if (typeof error.extensions !== 'undefined' && error.extensions.code === 'INTERNAL_SERVER_ERROR') {
      error.message = 'Internal server error'
      Object.keys(error.extensions).forEach(key => {
        if (key === 'code') {
          return
        }
        delete error.extensions![key]
      })
    }

    return error
  }

  private async createServer (): Promise<ApolloServer> {
    return new ApolloServer({
      schema: await this.buildSchema(),
      context: async (arg) => await generateContext({ ...arg, req: arg.req }),
      formatError: this.formatError,
      formatResponse: (response) => {
        return response
      },
      plugins: [
        new LoggingPlugin(this.logger),
        ApolloServerPluginLandingPageGraphQLPlayground()
      ]
    })
  }
}
