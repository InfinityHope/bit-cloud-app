import { axiosAuth, axiosClassic } from '@/app/api/interceptor'
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
	},

	async updateProfile(formData: any, id: number | undefined) {
		const { data } = await axiosAuth.patch<IUser>(`/users/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return data
	}
}
