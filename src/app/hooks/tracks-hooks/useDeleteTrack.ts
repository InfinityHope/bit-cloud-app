import { useMutation } from 'react-query'
import { TrackService } from '@/services/track-service/track.service'
import { useNotification } from '@/hooks/useNotification'
import { ITrack } from '@/types/interfaces/track.interface'

interface IOptions {
	onClose: () => void
	track: ITrack
}

export const useDeleteTrack = ({ track, onClose }: IOptions) => {
	const { errorMessage, successMessage } = useNotification()
	const { mutate: deleteTrack } = useMutation(
		['delete track', track.id],
		() => TrackService.deleteTrack(track.id),
		{
			onSuccess: response => {
				onClose()
				successMessage(`${response.data.message}`, '')
			},
			onError: (error: any) => {
				onClose()
				errorMessage(`${error.response.data.error}`, `${error.response.data.message}`)
			}
		}
	)

	return deleteTrack
}
