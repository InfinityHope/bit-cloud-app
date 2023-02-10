import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx'
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { MdOutlineReplay } from 'react-icons/md'

interface IPlayButton {
	isPlaying: boolean
	isRepeat: boolean
	repeat: () => void
	play: () => void
	pause: () => void
	next: () => void
	prev: () => void
}

const AudioControls: FC<IPlayButton> = ({
	isPlaying,
	play,
	pause,
	prev,
	next,
	repeat,
	isRepeat
}) => {
	return (
		<Flex alignItems={'center'} justifyContent={'space-around'}>
			<RxTrackPrevious size={35} cursor={'pointer'} onClick={prev} />
			{isPlaying ? (
				<AiOutlinePauseCircle size={40} cursor={'pointer'} onClick={pause} />
			) : (
				<AiOutlinePlayCircle size={40} cursor={'pointer'} onClick={play} />
			)}
			<RxTrackNext size={35} cursor={'pointer'} onClick={next} />
			<MdOutlineReplay
				color={isRepeat ? '#141839' : 'white'}
				size={35}
				cursor={'pointer'}
				onClick={repeat}
			/>
		</Flex>
	)
}

export default AudioControls
