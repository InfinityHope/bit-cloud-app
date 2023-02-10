import { useQuery } from 'react-query'
import { UserService } from '@/services/user-service/user.service'

export const useMusicians = () => {
	const { data: musicians, isLoading } = useQuery(
		'musicians list',
		() => UserService.getAllMusicians(),
		{
			select: ({ data }) => data
		}
	)

	return {
		musicians,
		isLoading
	}
}
