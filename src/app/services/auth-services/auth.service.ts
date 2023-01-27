import { axiosClassic } from '@/app/api/interceptor'
import { removeTokenFromStorage, saveToStorage } from '@/services/auth-services/helpers/auth.helper'
import { IAuthResponse, ILoginFields } from '@/types/interfaces/auth.interface'

export const AuthService = {
	async login(body: ILoginFields) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/login', body)
		response.data.accessToken ? saveToStorage(response.data) : response.data
		return response.data
	},
	async register(body: FormData) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/register', body, {
			headers: {
				'Content-type': 'multipart/form-data'
			}
		})
		response.data.accessToken ? saveToStorage(response.data) : response.data
		return response.data
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	}
}
