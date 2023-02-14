import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { AuthService } from '@/services/auth-services/auth.service'
import { IAuthResponse } from '@/types/interfaces/auth.interface'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useRegister = (reset: () => void) => {
	const { setUser } = useAuth()
	const { errorMessage, successMessage } = useNotification()

	const { mutate: registration } = useMutation(
		'login',
		(data: FormData) => AuthService.register(data),
		{
			onSuccess(data: IAuthResponse) {
				if (setUser) setUser(data.user)
				successMessage('Вы успешно зарегистрировались', '')
				reset()
			},

			onError(error: AxiosError<string[] | { statusCode: number; message: string }>) {
				if (error.response) {
					errorMessage(
						'Ошибка регистрации',
						Array.isArray(error.response.data)
							? error.response.data
							: error.response.data.message
					)
				}
			}
		}
	)

	return registration
}
