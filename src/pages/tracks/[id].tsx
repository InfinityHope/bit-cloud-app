import TrackScreen from '@/app/components/screens/tracks-screen/track-screen/TrackScreen'
import { TrackService } from '@/app/services/track-service/track.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

const TrackPage: NextPage = props => {
	return <TrackScreen />
}

export const getStaticProps: GetStaticProps = async ctx => {
	const id = ctx.params?.id as string

	const queryClient = new QueryClient()

	await queryClient.fetchQuery(['track info', id], () => TrackService.getTrackById(Number(id)))

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

export default TrackPage
