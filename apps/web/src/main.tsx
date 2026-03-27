import { ApolloProvider } from '@apollo/web/react'
import { client } from '@src/core/features/apollo.config.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/web'
import App from 'src/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
)
