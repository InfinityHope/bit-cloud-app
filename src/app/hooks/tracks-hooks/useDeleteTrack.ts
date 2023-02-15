import { queryClient } from '@/app/config/react-query.config'
import { useNotification } from '@/hooks/useNotification'
import { TrackService } from '@/services/track-service/track.service'
import { ITrack } from '@/types/interfaces/track.interface'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

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
			onSuccess: (response: { status: number; message: string }) => {
				Promise.all([
					queryClient.invalidateQueries(['track list']),
					queryClient.invalidateQueries(['musician info'])
				]).then(r => {
					onClose() //close alert
					successMessage(`${response.message}`, '')
				})
			},
			onError: (error: AxiosError<{ status: number; message: string }>) => {
				onClose() //close alert
				if (error) {
					errorMessage(
						`${error.response?.data.status}`,
						`${error.response?.data.message}`
					)
				}
			}
		}
	)

	return deleteTrack
}
