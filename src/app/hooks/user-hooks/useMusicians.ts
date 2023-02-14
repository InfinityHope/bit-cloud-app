import { UserService } from '@/services/user-service/user.service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useMusicians = () => {
	const { push } = useRouter()

	const { data: musicians, isLoading } = useQuery(
		'musicians list',
		() => UserService.getAllMusicians(),
		{
			onError(error: AxiosError<{ status: number; message: string }>) {
				if (error.response) {
					if (error.response.status === 404) {
						push('/404')
					}
					if (error.response.status === 500) {
						push('/500')
					}
				}
			}
		}
	)

	return {
		musicians,
		isLoading
	}
}
