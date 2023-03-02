import { IUser } from '@/types/interfaces/user.interface'
import { Dispatch, SetStateAction } from 'react'

export type TypeUserState = Omit<IUser, 'tracks'> | null

export interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
	authType: string
	setAuthType: Dispatch<SetStateAction<string>>
}
