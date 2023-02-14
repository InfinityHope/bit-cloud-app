import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { FC } from 'react'
import { CiVolumeHigh } from 'react-icons/ci'

interface ITrackVolume {
	volume: number
	changeVolume?: (value: number) => void
}

const TrackVolume: FC<ITrackVolume> = ({ volume, changeVolume }) => {
	return (
		<Flex alignItems={'center'} justifyContent={'space-evenly'}>
			<CiVolumeHigh size={40} />
			<Slider
				w={'40%'}
				aria-label='slider-ex-1'
				defaultValue={volume}
				min={0}
				max={100}
				step={1}
				onChange={changeVolume}
			>
				<SliderTrack>
					<SliderFilledTrack bg='darkBlue' />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Flex>
	)
}

export default TrackVolume
