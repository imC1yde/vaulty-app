import { ApolloProvider } from '@apollo/client/react'
import App from '@src/App.tsx'
import { client } from '@src/core/features/apollo.config.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// TODO
// [+] - add preview photos to landing page
// [+] - fix autofetch after data mutation
// [+] - fix "1000-page" problem
// [] - add production docker and nginx configs

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
)
