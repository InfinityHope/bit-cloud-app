import { ChangeEvent } from 'react'
export interface IContext {
	searchTerm: string
	changeSearchTerm: (e: ChangeEvent<HTMLInputElement> | null) => void
}
