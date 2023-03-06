import { UserService } from '@/app/services/user-service/user.service'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useAuth } from '../auth-hooks'
import { useNotification } from '../useNotification'
import { IUser } from './../../types/interfaces/user.interface'

export const useUpdateProfile = (userId: number) => {
	const { setUser } = useAuth()
	const { errorMessage, successMessage } = useNotification()
	const { mutate: updateProfile } = useMutation(
		['update profile', userId],
		(data: FormData) => UserService.updateProfile(data, userId),
		{
			onSuccess: (response: IUser) => {
				if (setUser) setUser(response)
				const prevUser = JSON.parse(localStorage.getItem('user') || '')

				localStorage.setItem('user', JSON.stringify({ ...response, role: prevUser?.role }))
				successMessage(`Успешно`, `Профиль обновлен`)
			},
			onError: (error: AxiosError<{ status: number; message: string }>) => {
				if (error) {
					errorMessage(
						`${error.response?.data.status}`,
						`${error.response?.data.message}`
					)
				}
			}
		}
	)
	return {
		updateProfile
	}
}
