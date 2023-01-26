import { ITrack } from '@/types/interfaces/track.interface'

export interface IUser {
	id: number
	name: string
	nickName: string
	email: string
	socialLinks: string[]
	telephone: string
	tracks: ITrack[]
}
