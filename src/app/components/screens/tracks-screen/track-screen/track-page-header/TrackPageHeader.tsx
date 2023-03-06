import { useAuth } from '@/app/hooks/auth-hooks'
import { useActions, useAppSelector } from '@/app/hooks/redux-hooks'
import { updateTrackActions } from '@/app/store/reducers/update-track.reducer'
import { ITrack, ITrackFields } from '@/app/types/interfaces/track.interface'
import { convertDate } from '@/app/utils/convertDate'
import { CustomEditableInput, UploadImage } from '@/components/ui'
import { Button, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { Control, UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import MenuActions from '../menu-actions/MenuActions'

interface ITrackPageHeader {
	track: ITrack
	control: Control<ITrackFields>
	reset: UseFormReset<ITrackFields>
	handleSubmit: UseFormHandleSubmit<ITrackFields>
	onSubmit: (data: ITrackFields) => void
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

	const { editing, img } = useAppSelector(state => state.updateTrack)
	const { setEditing, setImg } = useActions(updateTrackActions)

	return (
		<Flex>
			<UploadImage upload={editing} image={img} setImage={setImg} initialImage={track.img} />
			<Flex flexDirection={'column'}>
				{!editing ? (
					<Heading as={'h3'}>{track.title}</Heading>
				) : (
					<CustomEditableInput
						name={'title'}
						isRequired
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
