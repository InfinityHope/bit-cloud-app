import React from 'react'
import Meta from '@/components/meta/Meta'
import { Flex, Heading } from '@chakra-ui/react'
import MusicList from '@/ui/music-list/MusicList'
import PageHeader from '../../ui/page-header/PageHeader'
import bgImg from '@/assets/secondary-bg.jpg'
import { useTracks } from '@/hooks/tracks-hooks/useTracks'

const TracksPage = () => {
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

export default TracksPage
