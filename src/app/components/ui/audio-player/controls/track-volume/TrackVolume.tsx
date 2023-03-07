import {
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Tooltip
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { CiVolumeHigh, CiVolumeMute } from 'react-icons/ci'

interface ITrackVolume {
	volume: number
	changeVolume?: (value: number) => void
}

const TrackVolume: FC<ITrackVolume> = ({ volume, changeVolume }) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false)
	return (
		<Flex alignItems={'center'} justifyContent={'space-evenly'}>
			{volume === 0 ? <CiVolumeMute size={40} /> : <CiVolumeHigh size={40} />}
			<Slider
				w={'40%'}
				aria-label='slider-ex-1'
				defaultValue={volume}
				min={0}
				max={100}
				step={1}
				onChange={changeVolume}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<Tooltip
					hasArrow
					bg='darkBlue'
					color='white'
					placement='top'
					isOpen={showTooltip}
					label={`${volume}%`}
				>
					<SliderThumb />
				</Tooltip>
				<SliderTrack>
					<SliderFilledTrack bg='darkBlue' />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Flex>
	)
}

export default TrackVolume
