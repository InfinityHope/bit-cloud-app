import { useQuery } from 'react-query'
import { UserService } from '@/services/user-service/user.service'

export const useMusician = (nickName: string | string[] | undefined) => {
	const { data: musician, isLoading } = useQuery(
		['musician info', nickName],
		() => UserService.getMusician(String(nickName)),
		{
			select: ({ data }) => data,
			enabled: !!nickName
		}
	)

	return { musician, isLoading }
}
