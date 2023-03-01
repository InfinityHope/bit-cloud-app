import { useNotification } from '@/hooks/useNotification'
import { TrackService } from '@/services/track-service/track.service'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { queryClient } from './../../config/react-query.config'

export const useCreateTrack = () => {
	const { errorMessage, successMessage } = useNotification()
	const { mutate: createTrack } = useMutation(
		['create track'],
		(data: FormData) => TrackService.createTrack(data),
		{
			onSuccess: (response: any) => {
				Promise.all([
					queryClient.invalidateQueries(['track list']),
					queryClient.invalidateQueries(['musician info'])
				]).then(r => {
					successMessage(`Успешно`, `Новый трек создан`)
				})
			},
			onError: (error: AxiosError<{ statusCode: number; message: string }>) => {
				if (error) {
					errorMessage(
						`${error.response?.data.statusCode}`,
						`${error.response?.data.message}`
					)
				}
			}
		}
	)

	return createTrack
}
