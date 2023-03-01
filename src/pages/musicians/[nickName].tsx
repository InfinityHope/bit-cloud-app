import { UserService } from '@/app/services/user-service/user.service'
import MusicianScreen from '@/screens/musicians-screen/musician-screen/MusicianScreen'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

const Musician: NextPage = () => {
	return <MusicianScreen />
}

export const getStaticProps: GetStaticProps = async ctx => {
	const nickName = ctx.params?.nickName as string

	const queryClient = new QueryClient()

	await queryClient.fetchQuery(['musician info', nickName], () =>
		UserService.getMusician(nickName)
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export default Musician
