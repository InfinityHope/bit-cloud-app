import { useContext } from 'react'
import { AuthContext } from '@/app/providers/auth-provider/AuthProvider'

export const useAuth = () => useContext(AuthContext)
