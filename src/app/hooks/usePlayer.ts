import { API_URL } from '@/constants/api.constants'
import { useActions } from '@/hooks/redux-hooks/useActions'
import { useAppSelector } from '@/hooks/redux-hooks/useAppSelector'
import { ITrack } from '@/types/interfaces/track.interface'
import { useRef, useState } from 'react'

export const usePlayer = () => {
	let audio = useRef<HTMLAudioElement | null>(null)
	const { setPause, setCurrentTime, setPlay, setDuration, setVolume, setTrackIndex, setRepeat } =
		useActions()
	const { volume, tracks, trackIndex, isRepeat } = useAppSelector(state => state.player)

	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

	const setAudio = () => {
		if (tracks[trackIndex] && audio.current) {
			setCurrentTrack(tracks[trackIndex])
			audio.current.src = `${API_URL}/${tracks[trackIndex].audio}`
			audio.current.volume = volume / 100

			audio.current.onloadedmetadata = () => {
				if (audio.current) {
					setDuration(Math.ceil(audio.current.duration))
				}
				play()
			}
			audio.current.ontimeupdate = () => {
				if (audio.current) {
					setCurrentTime(Math.ceil(audio.current.currentTime))
				}
			}
		}
	}

	const play = () => {
		setPlay()
		audio.current?.play()
	}

	const pause = () => {
		setPause()
		audio.current?.pause()
	}

	const repeat = () => {
		setRepeat(!isRepeat)
	}

	const toPrevTrack = () => {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1)
		} else {
			setTrackIndex(trackIndex - 1)
		}
	}

	const toNextTrack = () => {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1)
		} else {
			setTrackIndex(0)
		}
	}

	const changeVolume = (value: number) => {
		if (audio.current) {
			audio.current.volume = value / 100
		}
		setVolume(value)
	}

	const changeCurrentTime = (value: number) => {
		if (audio.current) {
			audio.current.currentTime = value
		}
		setCurrentTime(value)
	}

	return {
		play,
		pause,
		toNextTrack,
		toPrevTrack,
		changeCurrentTime,
		changeVolume,
		repeat,
		setAudio,
		audio,
		currentTrack
	}
}
