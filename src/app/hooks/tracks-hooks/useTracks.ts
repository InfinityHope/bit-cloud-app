import { TrackService } from '@/services/track-service/track.service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useTracks = (searchTerm?: string) => {
	const { push } = useRouter()

	const { data: tracks, isLoading } = useQuery(
		'track list',
		() => TrackService.getAllTracks(searchTerm),
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
		tracks,
		isLoading
	}
}
