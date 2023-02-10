import { useMutation } from 'react-query'
import { IAuthResponse, ILoginFields } from '@/types/interfaces/auth.interface'
import { AuthService } from '@/services/auth-services/auth.service'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'

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

			onError(error: any) {
				if (error.response) {
					errorMessage('Ошибка авторизации', error.response.data.message)
				}
			}
		}
	)

	return login
}
