import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { AppConfig } from '@src/core/configs/app.config.ts'

export const client: ApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${AppConfig.NEST_ORIGIN_URL}/graphql`,
    credentials: 'include'
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {}
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
})

