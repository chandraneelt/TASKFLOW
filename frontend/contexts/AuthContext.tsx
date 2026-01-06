'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

// User interface - keeping it simple and clean
interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

// Auth context interface - I prefer explicit typing over any
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check auth status on mount - I like to keep this clean
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      // Clear invalid token
      Cookies.remove('token')
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      
      // Store token with 7 day expiry - matches backend JWT expiration
      Cookies.set('token', token, { expires: 7 })
      setUser(user)
      toast.success('Welcome back!')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      
      // Show helpful message for database connection issues
      if (error.response?.status === 503) {
        toast.error('Database not available. Please set up MongoDB first.', { duration: 5000 })
      } else {
        toast.error(message)
      }
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      const { token, user } = response.data
      
      Cookies.set('token', token, { expires: 7 })
      setUser(user)
      toast.success('Account created successfully!')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed'
      
      // Show helpful message for database connection issues
      if (error.response?.status === 503) {
        toast.error('Database not available. Please set up MongoDB first.', { duration: 5000 })
      } else {
        toast.error(message)
      }
      throw error
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    toast.success('Logged out')
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await api.put('/users/profile', data)
      setUser(response.data.user)
      toast.success('Profile updated!')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed'
      toast.error(message)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}