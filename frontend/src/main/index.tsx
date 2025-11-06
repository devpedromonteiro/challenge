import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider, ThemeProvider } from '@/presentation/contexts'
import { Router } from '@/main/routes/router'
import '@/presentation/styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
