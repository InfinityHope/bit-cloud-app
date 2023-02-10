import { IUser } from '@/types/interfaces/user.interface'

export interface ITrack {
	id: number
	title: string
	audio: string
	img: string
	resources: string
	userId: number
	tags: string[]
	description: string
	audio_duration: number
	author: IUser
}
