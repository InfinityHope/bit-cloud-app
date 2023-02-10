import React, { FC, useEffect } from 'react'
import { Box, Flex, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react'
import styles from './AudioPlayer.module.scss'
import trackImg from '@/assets/background.jpg'
import TrackProgress from '@/components/ui/audio-player/controls/track-progress/TrackProgress'
import AudioControls from '@/components/ui/audio-player/controls/audio-controls/AudioControls'
import TrackVolume from '@/components/ui/audio-player/controls/track-volume/TrackVolume'
import { API_URL } from '@/constants/api.constants'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'
import { usePlayer } from '@/hooks/usePlayer'
import { useAppSelector } from '@/hooks/redux-hooks/useAppSelector'
import { useActions } from '@/hooks/redux-hooks/useActions'

const MotionBox = motion(Box)

const AudioPlayer: FC = () => {
	const {
		setAudio,
		currentTrack,
		repeat,
		changeVolume,
		changeCurrentTime,
		toPrevTrack,
		toNextTrack,
		pause,
		play,
		audio
	} = usePlayer()
	const { volume, tracks, trackIndex, isRepeat, isPlaying, currentTime, duration } =
		useAppSelector(state => state.player)
	const { setPause, setCurrentTime, setDuration, setVolume } = useActions()

	useEffect(() => {
		setAudio()
	}, [tracks[trackIndex]])

	useEffect(() => {
		return () => {
			setCurrentTime(0)
			setDuration(0)
			setVolume(50)
			setPause()
			audio.current.src = null
		}
	}, [])

	useEffect(() => {
		if (isPlaying) {
			audio.current.play()
		} else {
			audio.current.pause()
		}
	}, [isPlaying])

	useEffect(() => {
		if (tracks[trackIndex]) {
			audio.current.onended = () => {
				if (trackIndex !== tracks.length - 1) {
					toNextTrack()
				} else {
					pause()
				}
			}
		}
	}, [audio.current.ended, tracks[trackIndex]])

	useEffect(() => {
		if (isRepeat) {
			setCurrentTime(Math.ceil(audio.current.currentTime))
			play()
		}
	}, [isRepeat, audio.current.ended])

	if (!currentTrack) {
		return null
	}

	return (
		<MotionBox
			className={styles.AudioPlayer}
			initial={'initialFromBottom'}
			animate={'animateFromBottom'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.5
			}}
			variants={animationsConfig}
		>
			<Grid
				alignItems={'center'}
				gridTemplateColumns={'10% 15% 50% 20%'}
				className={styles.AudioPlayerInner}
				gap={30}
			>
				<GridItem>
					<Flex alignItems={'center'} justifyContent={'space-between'}>
						<Image
							boxSize='65px'
							objectFit='cover'
							src={currentTrack ? `${API_URL}/${currentTrack.img}` : trackImg.src}
							alt={currentTrack?.img}
						/>
						<VStack>
							<Text>{currentTrack ? currentTrack.title : 'Untitled'}</Text>
							<Text>{currentTrack ? currentTrack.author.nickName : 'Unnamed'}</Text>
						</VStack>
					</Flex>
				</GridItem>
				<GridItem>
					<AudioControls
						isPlaying={isPlaying}
						isRepeat={isRepeat}
						repeat={repeat}
						pause={pause}
						play={play}
						next={toNextTrack}
						prev={toPrevTrack}
					/>
				</GridItem>
				<GridItem>
					<TrackProgress
						currentValue={currentTime}
						duration={duration}
						onChange={value => changeCurrentTime(value)}
					/>
				</GridItem>
				<GridItem>
					<TrackVolume volume={volume} changeVolume={value => changeVolume(value)} />
				</GridItem>
			</Grid>
		</MotionBox>
	)
}

export default AudioPlayer