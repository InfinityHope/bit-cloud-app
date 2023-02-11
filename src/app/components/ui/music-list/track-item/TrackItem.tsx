import { FC, memo, useRef } from 'react'
import { Image, Link, SimpleGrid, Td, Tooltip, Tr, useDisclosure } from '@chakra-ui/react'
import { ITrack } from '@/types/interfaces/track.interface'
import { msToTime } from '@/utils/msToTime'
import { AiOutlineDelete, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { API_URL } from '@/constants/api.constants'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'
import { FiDownload } from 'react-icons/fi'
import { MdArchive } from 'react-icons/md'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useDeleteTrack } from '@/hooks/tracks-hooks/useDeleteTrack'
import { useDownloadAudio } from '@/hooks/tracks-hooks/useDownloadAudio'
import { useAppSelector } from '@/hooks/redux-hooks/useAppSelector'
import { useActions } from '@/hooks/redux-hooks/useActions'
import { createDownloadUrl } from '@/app/utils/createDownloadUrl'
import { DeleteAlert } from '@/components/ui'

const MotionTr = motion(Tr)

interface ITrackItem {
	track: ITrack
	index: number
	selectTrack: (value: number) => void
}

const TrackItem: FC<ITrackItem> = memo(({ track, index, selectTrack }) => {
	const { isPlaying, tracks, trackIndex } = useAppSelector(state => state.player)
	const { setPlay, setPause } = useActions()

	const { user } = useAuth()
	const cancelRef = useRef<any>()
	const currentTrack = track.id === tracks[trackIndex]?.id

	const { isOpen, onOpen, onClose } = useDisclosure()
	const data = useDownloadAudio(track)
	const deleteTrack = useDeleteTrack({ track, onClose })

	const play = () => {
		setPlay()
	}

	const pause = () => {
		setPause()
	}

	return (
		<MotionTr
			key={track.id}
			variants={animationsConfig}
			initial={'listInitialLeft'}
			animate={'listAnimateLeft'}
			custom={index}
		>
			<Td w={'30%'}>
				<SimpleGrid columns={3} spacingX='40px' alignItems={'center'}>
					{currentTrack ? (
						isPlaying ? (
							<AiOutlinePauseCircle size={40} cursor={'pointer'} onClick={pause} />
						) : (
							<AiOutlinePlayCircle size={40} cursor={'pointer'} onClick={play} />
						)
					) : (
						<AiOutlinePlayCircle
							size={40}
							cursor={'pointer'}
							onClick={() => selectTrack(index)}
						/>
					)}

					<Image
						boxSize='80px'
						objectFit='cover'
						src={`${API_URL}/${track.img}`}
						alt={track.img}
					/>
					{track.author?.nickName}
				</SimpleGrid>
			</Td>
			<Td w={'30%'} textAlign={'center'}>
				{track.title}
			</Td>
			<Td w={'30%'} textAlign={'center'}>
				{msToTime(track.audio_duration)}
			</Td>
			{user?.id === track.author?.id ? (
				<>
					<Td>
						<Tooltip label='Скачать аудиозапись' aria-label='download audio'>
							<div>
								<FiDownload
									size={30}
									onClick={() => createDownloadUrl(data, track)}
									cursor={'pointer'}
								/>
							</div>
						</Tooltip>
					</Td>
					<Td>
						<Tooltip label='Скачать архив инструментов' aria-label='download resources'>
							<Link href={`${API_URL}/${track.resources}`} download>
								<MdArchive size={30} />
							</Link>
						</Tooltip>
					</Td>
					<Td>
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
					</Td>
				</>
			) : (
				<>
					<Td></Td>
					<Td></Td>
					<Td></Td>
				</>
			)}
		</MotionTr>
	)
})

export default TrackItem
