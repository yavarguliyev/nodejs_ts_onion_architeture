import {
  ApolloServerPlugin,
  GraphQLRequestListener
} from 'apollo-server-plugin-base'

class LoggingPlugin implements ApolloServerPlugin {
  public requestDidStart(): Promise<GraphQLRequestListener<any>> {
    return {} as any
  }
}

export default LoggingPlugin
