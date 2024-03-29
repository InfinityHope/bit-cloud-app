import { animationsConfig } from '@/app/config/animations.config'
import { playerActions } from '@/app/store/reducers/player.reducer'
import { createDownloadUrl } from '@/app/utils/createDownloadUrl'
import noImage from '@/assets/noImage.png'
import { DeleteAlert } from '@/components/ui'
import { API_URL } from '@/constants/api.constants'
import { useAuth } from '@/hooks/auth-hooks'
import { useActions, useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteTrack, useDownloadAudio } from '@/hooks/tracks-hooks'
import { ITrack } from '@/types/interfaces/track.interface'
import { msToTime } from '@/utils/msToTime'
import {
	Box,
	Flex,
	Grid,
	GridItem,
	Image,
	Tooltip,
	useDisclosure,
	useMediaQuery
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, MouseEvent } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { FiDownload } from 'react-icons/fi'
import { MdArchive } from 'react-icons/md'

const MotionFlex = motion(Flex)

interface ITrackItem {
	track: ITrack
	index: number
	selectTrack: (e: MouseEvent<SVGElement>) => void
}

const TrackItem: FC<ITrackItem> = memo(({ track, index, selectTrack }) => {
	const { push } = useRouter()
	const { user } = useAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [isLargerThan550] = useMediaQuery('(min-width: 550px)', {
		ssr: true,
		fallback: false
	})

	const { isPlaying, tracks, trackIndex } = useAppSelector(state => state.player)
	const { setPlay, setPause } = useActions(playerActions)

	const currentTrack = track.id === tracks[trackIndex]?.id
	const trackId = track.id

	const data = useDownloadAudio(trackId)

	const deleteTrack = useDeleteTrack({ trackId, onClose })

	const play = (e: MouseEvent<SVGElement>) => {
		e.stopPropagation()
		setPlay()
	}

	const pause = (e: MouseEvent<SVGElement>) => {
		e.stopPropagation()
		setPause()
	}

	const openAlert = (e: MouseEvent<SVGElement>) => {
		e.stopPropagation()
		onOpen()
	}

	const closeAlert = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onClose()
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
			<Box mr={isLargerThan550 ? '2.5em' : '.5em'}>
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
				templateColumns={isLargerThan550 ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)'}
				borderY={!currentTrack ? '2px solid' : '0px'}
				borderRight={!currentTrack ? '2px solid' : '0px'}
				borderColor={'#141115'}
				alignItems={'center'}
				_last={{ alignItems: 'none' }}
				backgroundColor={currentTrack ? 'black' : 'transparent'}
				borderRadius={'5px'}
				width={'100%'}
			>
				<GridItem>
					<Image
						boxSize='70px'
						objectFit='cover'
						src={
							track.img === 'image/noImage.png'
								? noImage.src
								: `${API_URL}/${track.img}`
						}
						alt={track.img}
						borderRadius={'5px'}
					/>
				</GridItem>

				{isLargerThan550 && <GridItem>{track.author?.nickName}</GridItem>}

				<GridItem display={'flex'} justifyContent={'center'}>
					{track.title}
				</GridItem>

				<GridItem display={'flex'} justifyContent={'center'}>
					{msToTime(track.audio_duration)}
				</GridItem>

				{isLargerThan550 && user?.id === track.author?.id ? (
					<Flex justifyContent={'space-evenly'} alignItems={'center'}>
						<Tooltip label='Скачать аудиозапись' aria-label='download audio'>
							<div>
								<FiDownload
									size={30}
									onClick={(e: MouseEvent<SVGElement>) => {
										e.stopPropagation()
										createDownloadUrl(data, track)
									}}
									cursor={'pointer'}
								/>
							</div>
						</Tooltip>

						<Tooltip label='Скачать архив инструментов' aria-label='download resources'>
							<Link
								href={`${API_URL}/${track.resources}`}
								download
								onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
							>
								<MdArchive size={30} />
							</Link>
						</Tooltip>

						<Tooltip label='Удаление трека' aria-label='usage'>
							<div>
								<AiOutlineDelete size={25} cursor={'pointer'} onClick={openAlert} />
							</div>
						</Tooltip>

						<DeleteAlert
							isOpen={isOpen}
							onClose={onClose}
							onCloseHandler={closeAlert}
							deleteTrack={deleteTrack}
						/>
					</Flex>
				) : null}
			</Grid>
		</MotionFlex>
	)
})

export default TrackItem
