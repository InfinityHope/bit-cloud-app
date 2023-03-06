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
	onChange: (value: number) => void
}

const TrackProgress: FC<ITrackProgress> = ({ currentValue, onChange, duration }) => {
	const [showTooltip, setShowTooltip] = useState(false)

	return (
		<Flex justifyContent={'space-evenly'}>
			<Text>{msToTime(currentValue)}</Text>
			<Slider
				width={'80%'}
				step={1}
				min={0}
				max={duration}
				value={currentValue}
				onChange={onChange}
				focusThumbOnChange={false}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<Tooltip
					hasArrow
					bg='darkBlue'
					placement='top'
					isOpen={showTooltip}
					label={msToTime(currentValue)}
				>
					<SliderThumb />
				</Tooltip>
				<SliderTrack>
					<SliderFilledTrack bg='darkBlue' />
				</SliderTrack>
				<SliderThumb>
					<Box color='blackAlpha.50' />
				</SliderThumb>
			</Slider>
			<Text>{msToTime(duration)}</Text>
		</Flex>
	)
}

export default TrackProgress
