import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChangeEvent } from 'react'

interface IUpdateTrackState {
	editing: boolean
	img: File | null
	audio: File | null
	resources: File | null
	audioDuration: number
	tags: string[]
}

const initialState: IUpdateTrackState = {
	editing: false,
	img: null,
	audio: null,
	resources: null,
	audioDuration: 0,
	tags: []
}

export const updateTrackSlice = createSlice({
	name: 'updateTrack',
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
		setTags: (state, action: PayloadAction<string[]>) => {
			state.tags = action.payload
		},
		clearTags: state => {
			state.tags = []
		},
		setEditing: (state, action: PayloadAction<boolean>) => {
			state.editing = action.payload
		},
		setAudioDuration: (state, action: PayloadAction<number>) => {
			state.audioDuration = action.payload
		},
		setImg: (state, action: PayloadAction<File | null>) => {
			if (action?.payload) {
				state.img = action.payload
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
			state.editing = false
			state.audioDuration = 0
		}
	}
})

export const updateTrackActions = updateTrackSlice.actions

export default updateTrackSlice.reducer
