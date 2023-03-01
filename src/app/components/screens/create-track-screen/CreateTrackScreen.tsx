import { useAuth } from '@/app/hooks/auth-hooks'
import { useActions } from '@/app/hooks/redux-hooks'
import { createTrackActions } from '@/app/store/reducers/create-track.reducer'
import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Meta from '../../meta/Meta'
import CreateTrackForm from './create-track-form/CreateTrackForm'

const CreateTrackScreen = () => {
	const { user } = useAuth()
	const { push } = useRouter()
	const { clearState } = useActions(createTrackActions)

	useEffect(() => {
		if (!user) {
			push('/')
		}
	}, [user])

	useEffect(() => {
		return () => clearState()
	}, [])

	return (
		<>
			<Meta title='Sound Cloud Create Track' />
			<Flex color={'white'} p={'2em'} flexDirection={'column'}>
				<Heading as={'h2'}>Добавить новый трек</Heading>
				<CreateTrackForm />
			</Flex>
		</>
	)
}

export default CreateTrackScreen
