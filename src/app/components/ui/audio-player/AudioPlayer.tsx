import trackImg from '@/assets/background.jpg'
import { AudioControls, TrackProgress, TrackVolume } from '@/components/ui'
import { animationsConfig } from '@/config/animations.config'
import { API_URL } from '@/constants/api.constants'
import { useActions } from '@/hooks/redux-hooks/useActions'
import { useAppSelector } from '@/hooks/redux-hooks/useAppSelector'
import { usePlayer } from '@/hooks/usePlayer'
import { Box, Flex, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC, useEffect } from 'react'
import styles from './AudioPlayer.module.scss'

const MotionBox = motion(Box)

const AudioPlayer: FC = () => {
	let {
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
	const { setPause, setCurrentTime, setDuration, setVolume, setTracks } = useActions()

	useEffect(() => {
		if (!audio.current) {
			audio.current = new Audio()
		} else {
			setAudio()
		}
	}, [tracks[trackIndex]])

	useEffect(() => {
		return () => {
			setCurrentTime(0)
			setDuration(0)
			setVolume(50)
			setPause()
			setTracks([])
			if (audio.current) {
				audio.current.src = ''
				audio.current = null
			}
		}
	}, [])

	useEffect(() => {
		if (isPlaying && audio) {
			audio.current?.play()
		} else {
			audio.current?.pause()
		}
	}, [isPlaying])

	useEffect(() => {
		if (tracks[trackIndex] && audio.current) {
			audio.current.onended = () => {
				if (trackIndex !== tracks.length - 1) {
					toNextTrack()
				} else {
					pause()
				}
			}
		}
	}, [audio.current?.ended, tracks[trackIndex]])

	useEffect(() => {
		if (isRepeat && audio.current) {
			setCurrentTime(Math.ceil(audio.current.currentTime))
			play()
		}
	}, [isRepeat, audio.current?.ended])

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
