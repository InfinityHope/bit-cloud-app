import playerReducer from '@/store/reducers/player.reducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createTrackReducer from './reducers/create-track.reducer'
import updateTrackReducer from './reducers/update-track.reducer'

const rootReducer = combineReducers({
	player: playerReducer,
	updateTrack: updateTrackReducer,
	createTrack: createTrackReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
