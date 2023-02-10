import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Flex, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react'
import styles from './AudioPlayer.module.scss'
import trackImg from '@/assets/background.jpg'
import TrackProgress from '@/components/ui/audio-player/controls/track-progress/TrackProgress'
import AudioControls from '@/components/ui/audio-player/controls/audio-controls/AudioControls'
import TrackVolume from '@/components/ui/audio-player/controls/track-volume/TrackVolume'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useActions } from '@/hooks/useActions'
import { API_URL } from '@/constants/api.constants'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'
import { ITrack } from '@/types/interfaces/track.interface'

const MotionBox = motion(Box)

const AudioPlayer: FC = () => {
	const { isPlaying, volume, tracks, currentTime, duration, trackIndex, isRepeat } =
		useAppSelector(state => state.player)

	const { setPause, setCurrentTime, setPlay, setDuration, setVolume, setTrackIndex, setRepeat } =
		useActions()

	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

	let audio = useRef<any>(new Audio())

	useEffect(() => {
		setAudio()
	}, [trackIndex])

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

	// useEffect(() => {
	// 	if (!audio.current.ended) {
	// 		toNextTrack()
	// 	}
	// }, [audio.current.ended])

	useEffect(() => {
		if (isRepeat) {
			setCurrentTime(Math.ceil(audio.current.currentTime))
			play()
		}
	}, [isRepeat, audio.current.ended])

	const setAudio = () => {
		if (tracks[trackIndex]) {
			setCurrentTrack(tracks[trackIndex])
			audio.current.src = `${API_URL}/${tracks[trackIndex].audio}`
			audio.current.volume = volume / 100
			audio.current.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.current.duration))
				play()
			}
			audio.current.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.current.currentTime))
			}
		}
	}

	const play = () => {
		setPlay()
		audio.current.play()
	}

	const pause = () => {
		setPause()
		audio.current.pause()
	}

	const repeat = () => {
		setRepeat(!isRepeat)
	}

	const toPrevTrack = () => {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1)
		} else {
			setTrackIndex(trackIndex - 1)
		}
	}

	const toNextTrack = () => {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1)
		} else {
			setTrackIndex(0)
		}
	}

	const changeVolume = (value: number) => {
		audio.current.volume = value / 100
		setVolume(value)
	}

	const changeCurrentTime = (value: number) => {
		audio.current.currentTime = value
		setCurrentTime(value)
	}

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
						<Image boxSize='60px' objectFit='cover' src={trackImg.src} alt={''} />
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
