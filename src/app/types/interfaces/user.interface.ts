import { ITrack } from '@/types/interfaces/track.interface'

export interface IAuthResponse {
	user: {
		uid: number
		email: string
		nickName: string
	}
	accessToken: string
}

export interface IUser {
	id: number
	name: string
	nickName: string
	email: string
	socialLinks: string[]
	telephone: string
	tracks: ITrack[]
}

export interface IRegisterFields {
	email: string
	password: string
	name: string
	nickName: string
	telephone: string
	isMusician: boolean
}

export interface ILoginFields {
	email: string
	password: string
}
