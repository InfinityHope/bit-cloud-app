import { TrackService } from '@/services/track-service/track.service'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useTrack = (trackId: number) => {
	const { push } = useRouter()

	const { data: track, isLoading } = useQuery(
		['track info', trackId],
		() => TrackService.getTrackById(trackId),
		{
			enabled: !!trackId,
			onError(error: { status: number; message: string }) {
				if (error) {
					if (error.status === 404) {
						push('/404')
					}
					if (error.status === 500) {
						push('/500')
					}
				}
			}
		}
	)

	return { track, isLoading }
}
