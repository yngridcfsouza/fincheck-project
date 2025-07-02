import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'



import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  // remove os mecanismos que vêm habilitados por padrão no useQuery
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
