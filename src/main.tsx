import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './global.css'
import Auth0ProviderComponent from './auth/Auth0ProviderComponent.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderComponent>
        <AppRoutes />
      </Auth0ProviderComponent>
    </Router>
  </React.StrictMode>,
)
