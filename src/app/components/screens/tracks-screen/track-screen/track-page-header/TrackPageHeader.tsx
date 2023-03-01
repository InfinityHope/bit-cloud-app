import { animationsConfig } from '@/app/config/animations.config'
import { API_URL } from '@/app/constants/api.constants'
import { useAuth } from '@/app/hooks/auth-hooks'
import { useActions, useAppSelector } from '@/app/hooks/redux-hooks'
import { updateTrackActions } from '@/app/store/reducers/update-track.reducer'
import { ITrack } from '@/app/types/interfaces/track.interface'
import { convertDate } from '@/app/utils/convertDate'
import { CustomEditableInput } from '@/components/ui'
import { Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { Control, UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import MenuActions from '../menu-actions/MenuActions'

interface ITrackPageHeader {
	track: ITrack
	control: Control
	reset: UseFormReset<any>
	handleSubmit: UseFormHandleSubmit<any>
	onSubmit: (data: any) => void
}

const MotionImage = motion(Image)

const TrackPageHeader: FC<ITrackPageHeader> = ({
	track,
	control,
	reset,
	handleSubmit,
	onSubmit
}) => {
	const { user } = useAuth()

	const editing = useAppSelector(state => state.updateTrack.editing)
	const { setEditing } = useActions(updateTrackActions)

	return (
		<Flex>
			<MotionImage
				variants={animationsConfig}
				initial={'initialFadeScale'}
				animate={'animateFadeScale'}
				transition={{
					opacity: { ease: 'linear' },
					duration: 0.4
				}}
				width={300}
				height={300}
				objectFit={'cover'}
				borderRadius={'10px'}
				src={`${API_URL}/${track.img}`}
				alt={track.img}
				mr={'1em'}
			/>
			<Flex flexDirection={'column'}>
				{!editing ? (
					<Heading as={'h3'}>{track.title}</Heading>
				) : (
					<CustomEditableInput
						name={'title'}
						control={control}
						defaultValue={track.title}
					/>
				)}

				<Text mt={'1em'} fontSize={'1.5em'}>
					Автор: {track.author.nickName}
				</Text>

				<Text fontSize={'1.5em'} mt={'1em'}>
					Дата создания: {convertDate(track.createdAt)}
				</Text>

				<Text fontSize={'1.5em'} mt={'1em'}>
					Дата последнего обновления: {convertDate(track.updatedAt)}
				</Text>

				{user?.id === track.userId &&
					(!editing ? (
						<MenuActions setEditing={setEditing} track={track} />
					) : (
						<ButtonGroup mt={'1.55em'}>
							<Button
								_hover={{ bgColor: 'darkBlue' }}
								bgColor={'lightBlue'}
								onClick={handleSubmit(onSubmit)}
							>
								Сохранить
							</Button>
							<Button
								_hover={{ bgColor: 'darkBlue' }}
								bgColor={'lightBlue'}
								onClick={() => {
									setEditing(false)
									reset()
								}}
							>
								Отменить
							</Button>
						</ButtonGroup>
					))}
			</Flex>
		</Flex>
	)
}

export default TrackPageHeader
