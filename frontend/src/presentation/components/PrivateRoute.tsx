import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/presentation/contexts'

type Props = {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

