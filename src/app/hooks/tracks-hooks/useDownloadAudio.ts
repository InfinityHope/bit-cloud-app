import { TrackService } from '@/services/track-service/track.service'
import { ITrack } from '@/types/interfaces/track.interface'
import { useQuery } from 'react-query'

export const useDownloadAudio = (track: ITrack) => {
	const { data } = useQuery(['download', track.id], () => TrackService.downloadAudio(track.id), {
		enabled: !!track
	})

	return data
}
