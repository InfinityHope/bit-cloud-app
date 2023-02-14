import { UserService } from '@/services/user-service/user.service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useMusician = (nickName: string | string[] | undefined) => {
	const { push } = useRouter()

	const { data: musician, isLoading } = useQuery(
		['musician info', nickName],
		() => UserService.getMusician(String(nickName)),
		{
			enabled: !!nickName,
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

	return { musician, isLoading }
}
