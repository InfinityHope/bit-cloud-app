import { msToTime } from '@/utils/msToTime'
import {
	Box,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	Tooltip
} from '@chakra-ui/react'
import { FC, useState } from 'react'

interface ITrackProgress {
	currentValue: number
	duration: number
	onChange?: (value: number) => void
}

const labelStyles = {
	mt: '2',
	ml: '-2.5',
	fontSize: 'sm'
}

const TrackProgress: FC<ITrackProgress> = ({ currentValue, onChange, duration }) => {
	const [showTooltip, setShowTooltip] = useState(false)
	return (
		<Flex justifyContent={'space-evenly'}>
			<Text>{msToTime(currentValue)}</Text>
			<Slider
				width={'80%'}
				step={1}
				aria-label='slider-ex-1'
				min={0}
				value={currentValue}
				max={duration}
				onChange={onChange}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<Tooltip
					hasArrow
					bg='darkBlue'
					color='white'
					placement='top'
					isOpen={showTooltip}
					label={`${msToTime(currentValue)}`}
				>
					<SliderThumb />
				</Tooltip>
				<SliderTrack>
					<SliderFilledTrack bg='darkBlue' />
				</SliderTrack>
				<SliderThumb boxSize={4}>
					<Box color='blackAlpha.50' />
				</SliderThumb>
			</Slider>
			<Text>{msToTime(duration)}</Text>
		</Flex>
	)
}

export default TrackProgress
