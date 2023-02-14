import { HistoryContext } from '@/app/providers/history-provider/HistoryProvider'
import { useContext } from 'react'

export const useHistory = () => useContext(HistoryContext)
