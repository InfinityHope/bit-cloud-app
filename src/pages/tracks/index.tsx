import TracksScreen from '@/app/components/screens/tracks-screen/TracksScreen'
import { TrackService } from '@/app/services/track-service/track.service'
import { GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

const Tracks: NextPage = () => {
	return <TracksScreen />
}

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient()

	await queryClient.fetchQuery(['track list'], () => TrackService.getAllTracks())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default Tracks
