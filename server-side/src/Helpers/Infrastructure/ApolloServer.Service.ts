import { Service, Container } from 'typedi'
import { ApolloServer, UserInputError } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { GraphQLSchema, GraphQLError, GraphQLFormattedError } from 'graphql'
import { buildSchema, ArgumentValidationError } from 'type-graphql'

import { UserResolver } from 'Resolvers/User.Resolver'
import { AuthGuard } from 'Helpers/Middlewares/AuthGuard'
import { AuthResolver } from 'Resolvers/Auth.Resolver'
import { generateContext } from 'Helpers/Utils/GenerateContext'

export interface IApolloServerService {
  get (): Promise<ApolloServer>
}

@Service()
export class ApolloServerService implements IApolloServerService {
  private server: ApolloServer

  public constructor () {}

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
        UserResolver,
        AuthResolver
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
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      context: async function (arg) {
        const req = arg.req
        const context = await generateContext({ ...arg, req })

        return context
      },
      formatError: this.formatError
    })
  }
}
