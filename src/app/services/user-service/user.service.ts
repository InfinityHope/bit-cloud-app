import { axiosAuth } from '@/app/api/interceptor'
import { IUser } from '@/types/interfaces/user.interface'
import { AxiosResponse } from 'axios'

export const UserService = {
	async getAllMusicians(searchTerm: string = ''): Promise<AxiosResponse<IUser[]>> {
		return axiosAuth.get<IUser[]>(`/users?${searchTerm && `q=${searchTerm}`}`)
	},

	async getMusician(nickName: string): Promise<AxiosResponse<IUser>> {
		return axiosAuth.get<IUser>(`/users/${nickName}`)
	}
}
