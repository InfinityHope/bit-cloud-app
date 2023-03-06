import { useAuth } from '@/app/hooks/auth-hooks'
import { useAuthorTracks } from '@/app/hooks/tracks-hooks'
import bgImg from '@/assets/third-bg.jpg'
import { CustomSpinner, PageHeader, TrackList } from '@/components/ui'
import { Flex, Heading, Text } from '@chakra-ui/react'
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
					<Flex flexDirection={'column'}>
						<PageHeader bgImg={bgImg.src}>
							<Heading as={'h2'} size={'4xl'} marginBottom={'0.5em'} color={'white'}>
								Мои треки
							</Heading>
						</PageHeader>
						{tracks.length !== 0 ? (
							<TrackList tracks={tracks} />
						) : (
							<Text mt={'1em'} ml={'1em'} fontSize={'2xl'} color={'white'}>
								У вас пока нет доступных треков
							</Text>
						)}
					</Flex>
				</>
			)}
		</>
	)
}

export default MyTracksScreen
