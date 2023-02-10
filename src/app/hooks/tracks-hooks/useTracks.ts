import { useQuery } from 'react-query'
import { TrackService } from '@/services/track-service/track.service'

export const useTracks = () => {
	const { data } = useQuery('track list', () => TrackService.getAllTracks(), {
		select: ({ data }) => data
	})
	return data
}
