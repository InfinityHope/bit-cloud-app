import { ITrack } from '@/types/interfaces/track.interface'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IPlayerState {
	tracks: ITrack[]
	trackIndex: number
	volume: number
	duration: number
	isPlaying: boolean
	isRepeat: boolean
}

const initialState: IPlayerState = {
	tracks: [],
	trackIndex: 0,
	volume: 50,
	duration: 0,
	isPlaying: false,
	isRepeat: false
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPlay: state => {
			state.isPlaying = true
		},
		setPause: state => {
			state.isPlaying = false
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload
		},
		setTracks: (state, action: PayloadAction<ITrack[]>) => {
			state.tracks = action.payload
		},
		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload
		},
		setTrackIndex: (state, action: PayloadAction<number>) => {
			state.trackIndex = action.payload
		},
		setRepeat: (state, action: PayloadAction<boolean>) => {
			state.isRepeat = action.payload
		}
	}
})

export const playerActions = playerSlice.actions

export default playerSlice.reducer
