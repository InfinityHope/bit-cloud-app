import { ChangeEvent, createContext, FC, PropsWithChildren, useState } from 'react'
import { IContext } from './search.interface'

export const SearchContext = createContext({} as IContext)

export const SearchProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const changeSearchTerm = (e: ChangeEvent<HTMLInputElement> | null) => {
		if (e) {
			setSearchTerm(e.target.value)
		}
	}

	return (
		<SearchContext.Provider value={{ searchTerm, changeSearchTerm }}>
			{children}
		</SearchContext.Provider>
	)
}
