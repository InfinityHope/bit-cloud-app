import { axiosClassic } from '@/app/api/interceptor'
import { IUser } from '@/types/interfaces/user.interface'

export const UserService = {
	async getAllMusicians(searchTerm: string = ''): Promise<IUser[]> {
		const { data } = await axiosClassic.get<IUser[]>(
			`/users?${searchTerm && `q=${searchTerm}`}`
		)
		return data
	},

	async getMusician(nickName: string): Promise<IUser> {
		const { data } = await axiosClassic.get<IUser>(`/users/${nickName}`)
		return data
	}
}
