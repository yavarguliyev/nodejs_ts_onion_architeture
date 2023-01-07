import { ApolloServerPlugin, GraphQLRequestListener, GraphQLRequestContext } from 'apollo-server-plugin-base'
import { GraphQLError } from 'graphql'

import { ILoggerService } from 'Helpers/Infrastructure/Logger.Service'

class LoggingPlugin implements ApolloServerPlugin {
  public constructor (private logger: ILoggerService) {}
  public requestDidStart (requestContext: GraphQLRequestContext<Record<string, any>>): GraphQLRequestListener | any {
    const logger = this.logger
    logger.verbose(`Request started: '${requestContext.request.operationName}'`, requestContext.request)
    return {
      didEncounterErrors (context: Record<string, any>): void {
        const error: GraphQLError = context.errors[0]
        const stacktrace = error.stack
        const { message, ...data } = error
        logger.error(message, { ...data, stacktrace })
      }
    } as any
  }
}

export default LoggingPlugin
