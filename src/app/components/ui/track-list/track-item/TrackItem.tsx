import { animationsConfig } from '@/app/config/animations.config'
import { createDownloadUrl } from '@/app/utils/createDownloadUrl'
import { DeleteAlert } from '@/components/ui'
import { API_URL } from '@/constants/api.constants'
import { useAuth } from '@/hooks/auth-hooks'
import { useActions, useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteTrack, useDownloadAudio } from '@/hooks/tracks-hooks'
import { ITrack } from '@/types/interfaces/track.interface'
import { msToTime } from '@/utils/msToTime'
import { Box, Flex, Grid, GridItem, Image, Tooltip, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, useRef } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { FiDownload } from 'react-icons/fi'
import { MdArchive } from 'react-icons/md'

const MotionFlex = motion(Flex)

interface ITrackItem {
	track: ITrack
	index: number
	selectTrack: (e: any) => void
}

const TrackItem: FC<ITrackItem> = memo(({ track, index, selectTrack }) => {
	const { push } = useRouter()
	const { isPlaying, tracks, trackIndex } = useAppSelector(state => state.player)
	const { setPlay, setPause } = useActions()
	const data = useDownloadAudio(track)
	const { user } = useAuth()
	const cancelRef = useRef<any>()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteTrack = useDeleteTrack({ track, onClose })

	const currentTrack = track.id === tracks[trackIndex]?.id

	const play = (e: any) => {
		e.stopPropagation()
		setPlay()
	}

	const pause = (e: any) => {
		e.stopPropagation()
		setPause()
	}

	return (
		<MotionFlex
			variants={animationsConfig}
			initial={'listInitialLeft'}
			animate={'listAnimateLeft'}
			custom={index}
			mt={'1em'}
			width={'100%'}
			justifyContent={'space-between'}
			alignItems={'center'}
			onClick={() => push(`/tracks/${track.id}`)}
			cursor='pointer'
		>
			<Box mr={'2.5em'}>
				{currentTrack ? (
					isPlaying ? (
						<CiPause1 size={40} cursor={'pointer'} onClick={pause} />
					) : (
						<CiPlay1 size={40} cursor={'pointer'} onClick={play} />
					)
				) : (
					<CiPlay1 size={40} cursor={'pointer'} onClick={selectTrack} />
				)}
			</Box>

			<Grid
				templateColumns='repeat(5, 1fr)'
				borderY={!currentTrack ? '2px solid' : '0px'}
				borderRight={!currentTrack ? '2px solid' : '0px'}
				borderColor={'#141115'}
				alignItems={'center'}
				backgroundColor={currentTrack ? 'black' : 'transparent'}
				borderRadius={'5px'}
				width={'100%'}
			>
				<GridItem>
					<Image
						boxSize='70px'
						objectFit='cover'
						src={`${API_URL}/${track.img}`}
						alt={track.img}
						borderRadius={'5px'}
					/>
				</GridItem>

				<GridItem>{track.author?.nickName}</GridItem>

				<GridItem display={'flex'} justifyContent={'center'}>
					{track.title}
				</GridItem>

				<GridItem display={'flex'} justifyContent={'center'}>
					{msToTime(track.audio_duration)}
				</GridItem>

				{user?.id === track.author?.id ? (
					<Flex justifyContent={'space-evenly'} alignItems={'center'}>
						<Tooltip label='Скачать аудиозапись' aria-label='download audio'>
							<div>
								<FiDownload
									size={30}
									onClick={() => createDownloadUrl(data, track)}
									cursor={'pointer'}
								/>
							</div>
						</Tooltip>

						<Tooltip label='Скачать архив инструментов' aria-label='download resources'>
							<Link href={`${API_URL}/${track.resources}`} download>
								<MdArchive size={30} />
							</Link>
						</Tooltip>

						<Tooltip label='Удаление трека' aria-label='usage'>
							<div>
								<AiOutlineDelete size={25} cursor={'pointer'} onClick={onOpen} />
							</div>
						</Tooltip>

						<DeleteAlert
							isOpen={isOpen}
							cancelRef={cancelRef}
							onClose={onClose}
							deleteTrack={deleteTrack}
						/>
					</Flex>
				) : null}
			</Grid>
		</MotionFlex>
	)
})

export default TrackItem
