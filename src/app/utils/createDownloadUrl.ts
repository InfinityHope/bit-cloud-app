import { ITrack } from '@/types/interfaces/track.interface'

export const createDownloadUrl = (data: undefined | Blob, track: ITrack) => {
	if (data) {
		const downloadUrl = window.URL.createObjectURL(data)
		const link = document.createElement('a')
		link.href = downloadUrl
		link.download = track.audio
		document.body.append(link)
		link.click()
		link.remove()
	}
}
