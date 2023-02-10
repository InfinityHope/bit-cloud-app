import React, { FC } from 'react'
import { FiVolume2 } from 'react-icons/fi'
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'

interface ITrackVolume {
	volume: number
	changeVolume?: (value: number) => void
}

const TrackVolume: FC<ITrackVolume> = ({ volume, changeVolume }) => {
	return (
		<Flex alignItems={'center'} justifyContent={'space-between'}>
			<FiVolume2 size={40} />
			<Slider
				w={'80%'}
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
