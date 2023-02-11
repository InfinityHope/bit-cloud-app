import { useQuery } from 'react-query'
import { TrackService } from '@/services/track-service/track.service'

export const useAuthorTracks = (authorId: number | undefined) => {
	const { data: tracks, isLoading: isTracksLoading } = useQuery(
		['track list', authorId],
		() => TrackService.getTracksByAuthor(authorId),
		{
			select: ({ data }) => data,
			enabled: !!authorId
		}
	)
	return {
		tracks,
		isTracksLoading
	}
}
