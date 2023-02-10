import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { IContext, TypeUserState } from '@/app/providers/auth-provider/auth.interface'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { AuthService } from '@/services/auth-services/auth.service'

export const AuthContext = createContext({} as IContext)

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)
	const [authType, setAuthType] = useState<string>('login')

	const { pathname, push } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			const user = JSON.parse(localStorage.getItem('user') || '')
			setUser(user)
		}
	}, [])

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')

		if (!accessToken && !user) {
			AuthService.logout()
			push('/auth').then(r => r)
			setUser(null)
		}
	}, [pathname])

	return (
		<AuthContext.Provider value={{ user, setUser, authType, setAuthType }}>
			{children}
		</AuthContext.Provider>
	)
}
