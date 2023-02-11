import { axiosAuth } from '@/app/api/interceptor'
import { AxiosResponse } from 'axios'
import { ITrack, ITrackResponse } from '@/types/interfaces/track.interface'

export const TrackService = {
	async getAllTracks(): Promise<AxiosResponse<ITrackResponse>> {
		return axiosAuth.get<ITrackResponse>('/track')
	},
	async getTracksByAuthor(authorId: number | undefined): Promise<AxiosResponse<ITrack[]>> {
		return axiosAuth.get<ITrack[]>(`track/author/${authorId}`)
	},
	async deleteTrack(trackId: number): Promise<AxiosResponse<any>> {
		return axiosAuth.delete(`/track/${trackId}`)
	},
	async downloadAudio(trackId: number): Promise<AxiosResponse<Blob>> {
		return axiosAuth.get(`/track/download/${trackId}`, {
			responseType: 'blob'
		})
	}
}
