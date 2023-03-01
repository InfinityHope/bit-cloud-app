import { useAppDispatch } from '@/hooks/redux-hooks/useAppDispatch'
import { bindActionCreators } from 'redux'

export const useActions = (actions: any) => {
	const dispatch = useAppDispatch()

	return bindActionCreators({ ...actions }, dispatch)
}
