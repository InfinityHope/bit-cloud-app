import React, { FC, memo } from 'react'
import { Image, SimpleGrid, Td, Tr } from '@chakra-ui/react'
import { ITrack } from '@/types/interfaces/track.interface'
import { msToTime } from '@/utils/msToTime'
import { IUser } from '@/types/interfaces/user.interface'
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/hooks/useAppSelector'
import { API_URL } from '@/constants/api.constants'

interface ITrackItem {
	track: ITrack
	author: IUser
	index: number
	selectTrack: (value: number) => void
}

const TrackItem: FC<ITrackItem> = memo(({ track, author, index, selectTrack }) => {
	const { isPlaying, tracks, trackIndex } = useAppSelector(state => state.player)
	const { setPlay, setPause } = useActions()
	const currentTrack = track.id === tracks[trackIndex]?.id

	const play = () => {
		setPlay()
	}

	const pause = () => {
		setPause()
	}

	return (
		<Tr key={track.id}>
			<Td w={'30%'}>
				<SimpleGrid columns={3} spacingX='40px' alignItems={'center'}>
					{currentTrack ? (
						isPlaying ? (
							<AiOutlinePauseCircle size={40} cursor={'pointer'} onClick={pause} />
						) : (
							<AiOutlinePlayCircle size={40} cursor={'pointer'} onClick={play} />
						)
					) : (
						<AiOutlinePlayCircle
							size={40}
							cursor={'pointer'}
							onClick={() => selectTrack(index)}
						/>
					)}

					<Image
						boxSize='80px'
						objectFit='cover'
						src={`${API_URL}/${track.img}`}
						alt={track.img}
					/>
					{author.nickName}
				</SimpleGrid>
			</Td>
			<Td w={'30%'} textAlign={'center'}>
				{track.title}
			</Td>
			<Td w={'30%'} textAlign={'center'}>
				{msToTime(track.audio_duration)}
			</Td>
			<Td></Td>
			<Td></Td>
			<Td></Td>
		</Tr>
	)
})

export default TrackItem
