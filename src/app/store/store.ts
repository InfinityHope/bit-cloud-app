import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerReducer from '@/store/reducers/player.reducer'

const rootReducer = combineReducers({
	player: playerReducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
