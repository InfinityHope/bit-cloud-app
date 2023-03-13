import { useTracks } from '@/app/hooks/tracks-hooks'
import { useSearchTerm } from '@/app/hooks/useSearchTerm'
import bgImg from '@/assets/background.jpg'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Meta from '../../meta/Meta'
import { CustomSpinner, PageHeader, TrackList } from '../../ui'

const SearchScreen = () => {
	const { searchTerm, changeSearchTerm } = useSearchTerm()
	const [searchString, setSearchString] = useState('')

	useEffect(() => {
		if (searchTerm) {
			setSearchString(searchTerm)
			changeSearchTerm(null)
		}
		return () => changeSearchTerm(null)
	}, [])

	const { tracks, isLoading } = useTracks(searchTerm)

	return (
		<>
			<Meta title={`Поиск по запросу ${searchString}`} />
			{isLoading ? <CustomSpinner /> : null}
			<Flex flexDirection={'column'} color={'#fff'}>
				<PageHeader bgImg={bgImg.src}>
					<Heading as={'h3'}>Поиск по запросу: {searchString}</Heading>
				</PageHeader>
				{tracks && tracks.tracks.length !== 0 ? (
					<TrackList tracks={tracks.tracks} />
				) : (
					<Text mt={'1em'} ml={'1em'} fontSize={'2xl'} color={'white'}>
						По данному запросу не найдено треков
					</Text>
				)}
			</Flex>
		</>
	)
}

export default SearchScreen
