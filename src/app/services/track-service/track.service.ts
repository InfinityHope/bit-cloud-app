import { axiosAuth } from '@/app/api/interceptor'
import { ITrack } from '@/app/types/interfaces/track.interface'
import { axiosClassic } from './../../api/interceptor'
import { ITrackResponse } from './../../types/interfaces/track.interface'

export const TrackService = {
	async getAllTracks(): Promise<ITrackResponse> {
		const { data } = await axiosClassic.get<ITrackResponse>('/track')
		return data
	},
	async getTracksByAuthor(authorId: number | undefined): Promise<ITrack[]> {
		const { data } = await axiosClassic.get<ITrack[]>(`track/author/${authorId}`)
		return data
	},
	async deleteTrack(trackId: number): Promise<any> {
		const { data } = await axiosAuth.delete(`/track/${trackId}`)
		return data
	},
	async downloadAudio(trackId: number): Promise<Blob> {
		const { data } = await axiosAuth.get(`/track/download/${trackId}`, {
			responseType: 'blob'
		})
		return data
	},
	async getTrackById(trackId: number): Promise<ITrack> {
		const { data } = await axiosClassic.get<ITrack>(`track/${trackId}`)
		return data
	}
}
