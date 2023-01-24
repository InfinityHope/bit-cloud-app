import { createContext, FC, PropsWithChildren, useState } from 'react'
import {
	IContext,
	TypeUserState
} from '@/app/providers/auth-provider/auth.interface'

export const AuthContext = createContext({} as IContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
