import { FileActions, UploadImage } from '@/app/components/ui'
import TagList from '@/app/components/ui/tag-list/TagList'
import { animationsConfig } from '@/app/config/animations.config'
import { useAuth } from '@/app/hooks/auth-hooks'
import { useActions, useAppSelector } from '@/app/hooks/redux-hooks'
import { useCreateTrack } from '@/app/hooks/tracks-hooks/useCreateTrack'
import { useNotification } from '@/app/hooks/useNotification'
import { createTrackActions } from '@/app/store/reducers/create-track.reducer'
import { ITrackFields } from '@/app/types/interfaces/track.interface'
import { checkKeyDown } from '@/app/utils/checkKeyDown'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
	useMediaQuery
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

const MotionBox = motion(Box)

const CreateTrackForm = () => {
	const { user } = useAuth()
	const { push } = useRouter()

	const [isLargerThan870] = useMediaQuery('(min-width: 870px)', {
		ssr: true,
		fallback: false
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ITrackFields>()

	const { tags, audio, resources, img, audioDuration } = useAppSelector(
		state => state.createTrack
	)
	const { addTag, removeTag, setAudio, setResources, setAudioDuration, setImg, clearState } =
		useActions(createTrackActions)

	const { errorMessage } = useNotification()

	const create = useCreateTrack()

	const onSubmit: SubmitHandler<ITrackFields> = data => {
		const formData: FormData = new FormData()
		if (resources && audio && user) {
			formData.append('audio', audio)
			formData.append('audio_duration', String(audioDuration))
			formData.append('resources', resources)
			formData.append('img', img ? img : '')
			formData.append('title', data.title)
			formData.append('userId', String(user.id))
			formData.append('description', data.description)
			formData.append('tags', tags.join(','))

			create(formData)
			reset()
			clearState()
			push('/my-tracks')
		} else {
			errorMessage('Ошибка', 'Загрузите аудио файл и файл с инструментами')
		}
	}

	return (
		<MotionBox
			as={'form'}
			onSubmit={handleSubmit(onSubmit)}
			onKeyDown={(e: KeyboardEvent) => checkKeyDown(e)}
			mt={'2em'}
			initial={'initialFadeScale'}
			animate={'animateFadeScale'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.4
			}}
			variants={animationsConfig}
		>
			<Flex
				flexDirection={!isLargerThan870 ? 'column' : 'row'}
				width={'full'}
				justifyContent={'space-between'}
			>
				<Flex
					direction={'column'}
					width={isLargerThan870 ? '45%' : '100%'}
					minHeight={'100%'}
				>
					<FormControl isInvalid={!!errors.title}>
						<FormLabel>Название трека</FormLabel>
						<Input
							placeholder='Введите название'
							{...register('title', {
								required: 'Поле обязательно для заполнения'
							})}
							type='text'
						/>
						{errors.title && (
							<FormErrorMessage>{errors.title?.message?.toString()}</FormErrorMessage>
						)}
					</FormControl>
					<TagList tags={tags} addTag={addTag} removeTag={removeTag} />
					<FormControl isInvalid={!!errors.description} mt={'1.5em'}>
						<FormLabel>Описание для трека</FormLabel>
						<Textarea
							placeholder='Введите описание'
							resize={'none'}
							{...register('description')}
						/>
						{errors.description && (
							<FormErrorMessage>
								{errors.description?.message?.toString()}
							</FormErrorMessage>
						)}
					</FormControl>
				</Flex>
				<Flex
					wrap={'wrap'}
					width={isLargerThan870 ? '45%' : '100%'}
					mt={!isLargerThan870 ? '1em' : 0}
				>
					<Box mt={'1em'}>
						<UploadImage
							upload={true}
							image={img}
							setImage={setImg}
							initialImage={`image/noImage.png`}
							width={'inherit'}
							height={'inherit'}
						/>
					</Box>
					<Box mt={'1em'}>
						<FileActions
							audio={audio}
							resources={resources}
							variant={'column'}
							setAudio={setAudio}
							setResources={setResources}
							setAudioDuration={setAudioDuration}
						/>
					</Box>
				</Flex>
			</Flex>
			<Button mt={'1em'} type={'submit'} width={isLargerThan870 ? '45%' : '100%'}>
				Создать
			</Button>
		</MotionBox>
	)
}

export default CreateTrackForm
