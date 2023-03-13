import { useContext } from 'react'
import { SearchContext } from './../providers/search-provider/SearchProvider'

export const useSearchTerm = () => useContext(SearchContext)
