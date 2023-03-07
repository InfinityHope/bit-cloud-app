import { playerActions } from '@/app/store/reducers/player.reducer'
import { TrackItem } from '@/components/ui'
import { useActions } from '@/hooks/redux-hooks'
import { ITrack } from '@/types/interfaces/track.interface'
import { Flex, Grid, GridItem, Text, useMediaQuery } from '@chakra-ui/react'
import { FC } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { RiMusic2Line } from 'react-icons/ri'

interface IMusicList {
	tracks: ITrack[]
}

const TrackList: FC<IMusicList> = ({ tracks }) => {
	const { setTracks, setTrackIndex, setPlay } = useActions(playerActions)

	const [isLargerThan550] = useMediaQuery('(min-width: 550px)', {
		ssr: true,
		fallback: false
	})

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
			pl={isLargerThan550 ? '2em' : '.3em'}
			pr={'.3em'}
			color={'white'}
			fontSize={'1.25em'}
		>
			<Flex>
				<Text mr={'.7em'}>#Автор</Text>
				<Grid
					alignItems={'center'}
					templateColumns={isLargerThan550 ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)'}
					width={'100%'}
				>
					<GridItem />
					{isLargerThan550 && <GridItem />}
					<GridItem display={'flex'} justifyContent={'center'}>
						<RiMusic2Line />
					</GridItem>
					<GridItem display={'flex'} justifyContent={'center'}>
						<BiTimeFive />
					</GridItem>
					{isLargerThan550 && <GridItem />}
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

export default TrackList
