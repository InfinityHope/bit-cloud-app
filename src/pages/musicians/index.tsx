import { UserService } from '@/app/services/user-service/user.service'
import MusiciansScreen from '@/screens/musicians-screen/MusiciansScreen'
import { GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

const Musicians: NextPage = props => {
	return <MusiciansScreen />
}

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient()

	await queryClient.fetchQuery(['musicians list'], () => UserService.getAllMusicians())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default Musicians
