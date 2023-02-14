import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { AuthService } from '@/services/auth-services/auth.service'
import { IAuthResponse, ILoginFields } from '@/types/interfaces/auth.interface'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useLogin = (reset: () => void) => {
	const { setUser } = useAuth()
	const { errorMessage, successMessage } = useNotification()

	const { mutate: login } = useMutation(
		'login',
		(data: ILoginFields) => AuthService.login(data),
		{
			onSuccess(data: IAuthResponse) {
				if (setUser) setUser(data.user)
				successMessage('Вы успешно вошли', '')
				reset()
			},

			onError(error: AxiosError<string[] | { statusCode: number; message: string }>) {
				if (error.response) {
					errorMessage(
						'Ошибка авторизации',
						Array.isArray(error.response.data)
							? error.response.data
							: error.response.data.message
					)
				}
			}
		}
	)

	return login
}
