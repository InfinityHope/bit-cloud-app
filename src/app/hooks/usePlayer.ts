import { API_URL } from '@/constants/api.constants'
import { useRef, useState } from 'react'
import { useActions } from '@/hooks/redux-hooks/useActions'
import { useAppSelector } from '@/hooks/redux-hooks/useAppSelector'
import { ITrack } from '@/types/interfaces/track.interface'

export const usePlayer = () => {
	let audio = useRef<any>(new Audio())
	const { setPause, setCurrentTime, setPlay, setDuration, setVolume, setTrackIndex, setRepeat } =
		useActions()
	const { volume, tracks, trackIndex, isRepeat } = useAppSelector(state => state.player)

	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

	const setAudio = () => {
		if (tracks[trackIndex]) {
			setCurrentTrack(tracks[trackIndex])
			audio.current.src = `${API_URL}/${tracks[trackIndex].audio}`
			audio.current.volume = volume / 100
			audio.current.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.current.duration))
				play()
			}
			audio.current.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.current.currentTime))
			}
		}
	}

	const play = () => {
		setPlay()
		audio.current.play()
	}

	const pause = () => {
		setPause()
		audio.current.pause()
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
		audio.current.volume = value / 100
		setVolume(value)
	}

	const changeCurrentTime = (value: number) => {
		audio.current.currentTime = value
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
