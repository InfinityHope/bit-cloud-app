import { Dispatch, SetStateAction } from 'react'

export interface IHistoryContext {
	history: string[]
	setHistory: Dispatch<SetStateAction<string[]>>
	back(): void
}
