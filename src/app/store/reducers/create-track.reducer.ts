import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChangeEvent } from 'react'

interface ICreateTrackState {
	img: File | null
	audio: File | null
	resources: File | null
	audioDuration: number
	tags: string[]
}

const initialState: ICreateTrackState = {
	img: null,
	audio: null,
	resources: null,
	audioDuration: 0,
	tags: []
}

export const createTrackSlice = createSlice({
	name: 'createTrack',
	initialState,
	reducers: {
		addTag: (state, action: PayloadAction<string>) => {
			state.tags = [...state.tags, action.payload]
		},
		removeTag: (state, action: PayloadAction<number>) => {
			state.tags = state.tags.filter(
				(tag, currentIndex) => tag[currentIndex] !== tag[action.payload]
			)
		},
		setAudioDuration: (state, action: PayloadAction<number>) => {
			state.audioDuration = action.payload
		},
		setImg: (state, action: PayloadAction<ChangeEvent<HTMLInputElement> | null>) => {
			if (action.payload) {
				const e = action.payload
				if (e.target.files) {
					console.log(e.target.files[0])
					const file = e.target.files[0]
					state.img = file
				}
			}
		},
		setResources: (state, action: PayloadAction<ChangeEvent<HTMLInputElement> | null>) => {
			if (action.payload) {
				const e = action.payload
				if (e.target.files) {
					const file = e.target.files[0]
					state.resources = file
				}
			}
		},
		setAudio: (state, action: PayloadAction<ChangeEvent<HTMLInputElement> | null>) => {
			if (action.payload) {
				const e = action.payload
				if (e.target.files) {
					const file = e.target.files[0]
					state.audio = file
				}
			}
		},
		clearState: state => {
			state.audio = null
			state.resources = null
			state.img = null
			state.tags = []
			state.audioDuration = 0
		}
	}
})

export const createTrackActions = createTrackSlice.actions

export default createTrackSlice.reducer
