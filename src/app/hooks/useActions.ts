import { bindActionCreators } from 'redux'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { playerActions } from '@/store/reducers/player.reducer'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(
		{
			...playerActions
		},
		dispatch
	)
}
