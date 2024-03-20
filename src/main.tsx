import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './global.css'
import Auth0ProviderComponent from './auth/Auth0ProviderComponent.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderComponent>
          <AppRoutes />
        </Auth0ProviderComponent>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
