import Meta from '@/components/meta/Meta'
import { Flex, Heading } from '@chakra-ui/react'
import { MusicList, PageHeader } from '@/components/ui'
import { useTracks } from '@/hooks/tracks-hooks/useTracks'
import bgImg from '@/assets/secondary-bg.jpg'

const TracksScreen = () => {
	const tracks = useTracks()
	return (
		<>
			<Meta title={'Sound Cloud Tracks'} />
			<Flex color={'#fff'} flexDirection={'column'}>
				{tracks && (
					<>
						<PageHeader bgImg={bgImg.src}>
							<Heading as={'h3'} size={'3xl'}>
								Все треки
							</Heading>
						</PageHeader>
						<MusicList tracks={tracks.tracks} />
					</>
				)}
			</Flex>
		</>
	)
}

export default TracksScreen
