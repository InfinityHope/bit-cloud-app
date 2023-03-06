import { TrackService } from '@/services/track-service/track.service'
import { useQuery } from 'react-query'

export const useDownloadAudio = (trackId: number) => {
	const { data } = useQuery(['download', trackId], () => TrackService.downloadAudio(trackId))

	return data
}
