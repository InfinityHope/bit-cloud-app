import { queryClient } from '@/app/config/react-query.config'
import { useNotification } from '@/hooks/useNotification'
import { TrackService } from '@/services/track-service/track.service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

interface IOptions {
	onClose: () => void
	trackId: number
}

export const useDeleteTrack = ({ trackId, onClose }: IOptions) => {
	const { errorMessage, successMessage } = useNotification()
	const { pathname, push } = useRouter()

	const { mutate: deleteTrack } = useMutation(
		['delete track', trackId],
		() => TrackService.deleteTrack(trackId),
		{
			onSuccess: (response: { status: number; message: string }) => {
				Promise.all([
					queryClient.invalidateQueries(['track list']),
					queryClient.invalidateQueries(['musician info'])
				]).then(r => {
					onClose() //close alert
					successMessage(`${response.message}`, '')
					if (pathname === `/tracks/[id]`) {
						push('/my-tracks')
					}
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
