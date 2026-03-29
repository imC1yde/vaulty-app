import { ApolloProvider } from '@apollo/client/react'
import App from '@src/App.tsx'
import { client } from '@src/core/features/apollo.config.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
)
