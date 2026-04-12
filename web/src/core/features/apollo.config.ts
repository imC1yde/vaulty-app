import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client: ApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `/graphql`,
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

