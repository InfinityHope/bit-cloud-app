import { useMutation } from 'react-query'
import { IAuthResponse } from '@/types/interfaces/auth.interface'
import { AuthService } from '@/services/auth-services/auth.service'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'

export const useRegister = (reset: () => void) => {
	const { setUser } = useAuth()
	const { errorMessage, successMessage } = useNotification()

	const { mutate: registration } = useMutation(
		'login',
		(data: FormData) => AuthService.register(data),
		{
			onSuccess(data: IAuthResponse) {
				if (setUser) setUser(data.user)
				successMessage('Вы успешно зарегестрировались', '')
				reset()
			},

			onError(error: any) {
				if (error.response) {
					errorMessage('Ошибка регистрации', error.response.data.message)
				}
			}
		}
	)

	return registration
}
