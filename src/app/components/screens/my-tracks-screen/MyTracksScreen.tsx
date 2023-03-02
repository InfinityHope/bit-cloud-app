import { useAuth } from '@/app/hooks/auth-hooks'
import { useAuthorTracks } from '@/app/hooks/tracks-hooks'
import bgImg from '@/assets/third-bg.jpg'
import { CustomSpinner, PageHeader, TrackList } from '@/components/ui'
import { Heading } from '@chakra-ui/react'
import Meta from '../../meta/Meta'

const MyTracksScreen = () => {
	const { user } = useAuth()

	const { tracks, isTracksLoading } = useAuthorTracks(user?.id)

	return (
		<>
			{isTracksLoading ? <CustomSpinner /> : null}
			{tracks && (
				<>
					<Meta title={`Bit Cloud My Tracks`} />
					<PageHeader bgImg={bgImg.src}>
						<Heading as={'h2'} size={'4xl'} marginBottom={'0.5em'} color={'white'}>
							Мои треки
						</Heading>
					</PageHeader>
					<TrackList tracks={tracks} />
				</>
			)}
		</>
	)
}

export default MyTracksScreen
