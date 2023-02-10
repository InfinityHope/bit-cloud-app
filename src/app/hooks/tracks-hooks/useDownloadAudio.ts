import { useQuery } from 'react-query'
import { TrackService } from '@/services/track-service/track.service'
import { ITrack } from '@/types/interfaces/track.interface'

export const useDownloadAudio = (track: ITrack) => {
	const { data } = useQuery(['download', track.id], () => TrackService.downloadAudio(track.id), {
		enabled: !!track,
		select: ({ data }) => data
	})

	return data
}
