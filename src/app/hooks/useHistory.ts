import { useContext } from 'react'
import { HistoryContext } from '@/app/providers/history-provider/HistoryProvider'

export const useHistory = () => useContext(HistoryContext)
