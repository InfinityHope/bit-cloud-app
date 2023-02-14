import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { CiPause1, CiPlay1, CiRepeat } from 'react-icons/ci'
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx'

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
			<RxTrackPrevious size={30} cursor={'pointer'} onClick={prev} />
			{isPlaying ? (
				<CiPause1 size={45} cursor={'pointer'} onClick={pause} />
			) : (
				<CiPlay1 size={45} cursor={'pointer'} onClick={play} />
			)}
			<RxTrackNext size={30} cursor={'pointer'} onClick={next} />
			<CiRepeat
				color={isRepeat ? '#3542c6' : 'white'}
				size={35}
				cursor={'pointer'}
				onClick={repeat}
			/>
		</Flex>
	)
}

export default AudioControls
