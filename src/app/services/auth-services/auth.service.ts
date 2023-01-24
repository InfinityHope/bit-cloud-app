import { axiosClassic } from '@/app/api/interceptor'
import {
	IAuthResponse,
	ILoginFields,
	IRegisterFields
} from '@/types/interfaces/user.interface'
import {
	removeTokenFromStorage,
	saveToStorage
} from '@/services/auth-services/helpers/auth.helper'

export const AuthService = {
	async login(body: ILoginFields) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login',
			body
		)
		response.data.accessToken ? saveToStorage(response.data) : response.data
	},
	async register(body: IRegisterFields) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/register',
			body
		)
		response.data.accessToken ? saveToStorage(response.data) : response.data
	},

	logout() {
		removeTokenFromStorage()
		localStorage.removeItem('user')
	}
}
