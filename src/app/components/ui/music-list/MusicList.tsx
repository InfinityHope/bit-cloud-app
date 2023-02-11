import { FC } from 'react'
import { ITrack } from '@/types/interfaces/track.interface'
import { Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { RiMusic2Line } from 'react-icons/ri'
import { TrackItem } from '@/components/ui'
import { BiTimeFive } from 'react-icons/bi'
import { useActions } from '@/hooks/redux-hooks/useActions'

interface IMusicList {
	tracks: ITrack[]
}

const MusicList: FC<IMusicList> = ({ tracks }) => {
	const { setTracks, setTrackIndex, setPlay } = useActions()

	const selectTrack = (value: number) => {
		setTracks(tracks)
		setTrackIndex(value)
		setPlay()
	}

	return (
		<TableContainer marginTop={8} height={'100%'} overflowX={'hidden'}>
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
						<TrackItem
							selectTrack={selectTrack}
							key={track.id}
							track={track}
							index={index}
						/>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default MusicList
