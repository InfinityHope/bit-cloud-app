import React, { FC } from 'react'
import { ITrack } from '@/types/interfaces/track.interface'
import { Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { RiMusic2Line } from 'react-icons/ri'
import TrackItem from '@/ui/music-list/track-item/TrackItem'
import { BiTimeFive } from 'react-icons/bi'
import { IUser } from '@/types/interfaces/user.interface'
import { useActions } from '@/hooks/redux-hooks/useActions'

interface IMusicList {
	tracks: ITrack[]
	author?: IUser
}

const MusicList: FC<IMusicList> = ({ tracks, author }) => {
	const { setTracks, setTrackIndex, setPlay } = useActions()

	const selectTrack = (value: number) => {
		setTracks([
			...tracks.map(track => ({
				...track,
				author: author ? author : track.author
			}))
		])
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
							author={author ? author : track.author}
							index={index}
						/>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default MusicList
