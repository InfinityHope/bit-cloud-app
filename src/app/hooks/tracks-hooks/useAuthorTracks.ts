import { TrackService } from '@/services/track-service/track.service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useAuthorTracks = (authorId: number | undefined) => {
	const { push } = useRouter()

	const { data: tracks, isLoading: isTracksLoading } = useQuery(
		['track list', authorId],
		() => TrackService.getTracksByAuthor(authorId),
		{
			enabled: !!authorId,
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
		isTracksLoading
	}
}
