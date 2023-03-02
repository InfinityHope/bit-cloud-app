import { ITrack } from '@/types/interfaces/track.interface'

export interface IUser {
	id: number
	name: string
	nickName: string
	email: string
	role: string
	avatar: string
	socialLinks: string[]
	telephone: string
	tracks: ITrack[]
}

export interface IProfileFields {
	name: string
	nickName: string
	email: string
	avatar: string
	socialLinks: string[]
	telephone: string
}
