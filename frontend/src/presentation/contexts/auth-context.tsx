import React, { createContext, useContext, useState } from 'react'
import type { AccountModel } from '@/domain/models'

type AuthContextType = {
  account: AccountModel | null
  setAccount: (account: AccountModel | null) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccountState] = useState<AccountModel | null>(() => {
    const saved = localStorage.getItem('account')
    return saved ? JSON.parse(saved) : null
  })

  const setAccount = (acc: AccountModel | null) => {
    setAccountState(acc)
    if (acc) {
      localStorage.setItem('account', JSON.stringify(acc))
    } else {
      localStorage.removeItem('account')
    }
  }

  const isAuthenticated = !!account?.accessToken

  return (
    <AuthContext.Provider value={{ account, setAccount, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

