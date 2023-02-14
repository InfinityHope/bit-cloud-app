import { useActions } from '@/hooks/redux-hooks/useActions'
import { ITrack } from '@/types/interfaces/track.interface'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { RiMusic2Line } from 'react-icons/ri'
import TrackItem from './track-item/TrackItem'

interface IMusicList {
	tracks: ITrack[]
}

const MusicList: FC<IMusicList> = ({ tracks }) => {
	const { setTracks, setTrackIndex, setPlay } = useActions()

	const selectTrack = (e: any, value: number) => {
		e.stopPropagation()
		setTracks(tracks)
		setTrackIndex(value)
		setPlay()
	}

	return (
		<Flex
			flexDirection={'column'}
			width={'100%'}
			marginTop={8}
			height={'100%'}
			overflowX={'hidden'}
			pt={'1em'}
			pl={'2em'}
			pr={'.3em'}
			fontSize={'1.25em'}
		>
			<Flex>
				<Text mr={'.7em'}>#Author</Text>
				<Grid alignItems={'center'} templateColumns='repeat(5, 1fr)' width={'100%'}>
					<GridItem />
					<GridItem />
					<GridItem display={'flex'} justifyContent={'center'}>
						<RiMusic2Line />
					</GridItem>
					<GridItem display={'flex'} justifyContent={'center'}>
						<BiTimeFive />
					</GridItem>
					<GridItem />
				</Grid>
			</Flex>
			{tracks.map((track, index) => (
				<TrackItem
					selectTrack={(e: any) => selectTrack(e, index)}
					key={track.id}
					track={track}
					index={index}
				/>
			))}
		</Flex>
	)
}

export default MusicList

{
	/* <TableContainer marginTop={8} height={'100%'} overflowX={'hidden'} ml={'2em'} mr={'.3em'}>
			<Table variant='simple' size={'lg'} colorScheme={'secondary'}>
				<Thead>
					<Tr>
						<Th>#Author</Th>
						<Th>
							<Flex justifyContent={'center'}>
								<RiMusic2Line />
							</Flex>
						</Th>
						<Th>
							<Flex justifyContent={'center'}>
								<BiTimeFive />
							</Flex>
						</Th>
						<Th></Th>
						<Th></Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{tracks.map((track, index) => (
						<Link href={`/tracks/${track.id}`} passHref>
							<TrackItem
								selectTrack={selectTrack}
								key={track.id}
								track={track}
								index={index}
							/>
						</Link>
					))}
				</Tbody>
			</Table>
		</TableContainer> */
}
