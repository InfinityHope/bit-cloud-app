import { IContext, TypeUserState } from '@/app/providers/auth-provider/auth.interface'
import Cookies from 'js-cookie'
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'

export const AuthContext = createContext({} as IContext)

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)
	const [authType, setAuthType] = useState<string>('login')

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			const user = JSON.parse(localStorage.getItem('user') || '')
			setUser(user)
		}
	}, [])

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken) {
			setUser(null)
			localStorage.removeItem('user')
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser, authType, setAuthType }}>
			{children}
		</AuthContext.Provider>
	)
}
