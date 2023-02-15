import { useUpdateTrack } from '@/app/hooks/tracks-hooks/useUpdateTrack'
import { convertDate } from '@/app/utils/convertDate'
import { stringCut } from '@/app/utils/stringCut'
import Meta from '@/components/meta/Meta'
import {
	CustomEditableInput,
	CustomEditableTextarea,
	CustomSpinner,
	TagList,
	TrackMenuActions
} from '@/components/ui'
import { API_URL } from '@/constants/api.constants'
import { useAuth } from '@/hooks/auth-hooks'
import { useTrack } from '@/hooks/tracks-hooks'
import { Box, Button, ButtonGroup, Flex, Heading, Image, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const TrackScreen = () => {
	const { query } = useRouter()
	const { control, handleSubmit, reset } = useForm()
	const { user } = useAuth()

	const inputImgRef = useRef<HTMLInputElement | null>(null)
	const inputAudioRef = useRef<HTMLInputElement | null>(null)
	const inputResourcesRef = useRef<HTMLInputElement | null>(null)

	const [editing, setEditing] = useState(false)

	const [img, setImg] = useState<File | null>(null)
	const [audio, setAudio] = useState<File | null>(null)
	const [resources, setResources] = useState<File | null>(null)
	const [audioDuration, setAudioDuration] = useState<number | null>(null)

	const trackId = query?.id

	const { track, isLoading } = useTrack(Number(trackId))
	const update = useUpdateTrack(Number(trackId))

	const handleChangeFile = (
		e: ChangeEvent<HTMLInputElement>,
		setFunction: Dispatch<SetStateAction<File | null>>
	) => {
		if (e.target.files) {
			const file = e.target.files[0]
			if (file.type === 'audio/mpeg') {
				const audio = new Audio()
				audio.src = URL.createObjectURL(file)
				audio.onloadedmetadata = () => {
					setAudioDuration(Math.ceil(audio.duration))
				}
			}
			setFunction(file)
		}
	}

	const onSubmit = (data: any) => {
		const formData: FormData = new FormData()
		if (track) {
			formData.append('audio', audio ? audio : track?.audio)
			formData.append(
				'audio_duration',
				audioDuration ? audioDuration.toString() : track?.audio_duration.toString()
			)
			formData.append('resources', resources ? resources : track?.resources)
			formData.append('img', img ? img : track?.img)
			formData.append('title', data.title ? data.title : track?.title)
			formData.append('description', data.description ? data.description : track?.description)
			formData.append('tags', '')

			update(formData)

			setImg(null)
			setAudio(null)
			setResources(null)
			setEditing(false)
			reset()
		}
	}

	return (
		<>
			<Meta title={`Sound Cloud Track: ${track?.title}`} />
			{isLoading ? <CustomSpinner /> : null}
			{track && (
				<Box p={'3em'} color={'white'} overflowY={'auto'}>
					<Flex>
						<Image
							width={300}
							height={300}
							objectFit={'cover'}
							borderRadius={'10px'}
							border={editing ? '1px solid #fff' : ''}
							cursor={editing ? 'pointer' : 'default'}
							src={`${API_URL}/${track.img}`}
							alt={track.img}
							mr={'1em'}
							onClick={
								editing
									? () => inputImgRef.current && inputImgRef.current.click()
									: () => {}
							}
						/>
						<Input
							ref={inputImgRef}
							type='file'
							accept={'image/*'}
							onChange={e => handleChangeFile(e, setImg)}
							hidden
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

							{user?.id === track.userId ? (
								!editing ? (
									<TrackMenuActions setEditing={setEditing} track={track} />
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
								)
							) : null}
						</Flex>
					</Flex>
					<Flex mt={'1em'} flexDirection={'column'}>
						{editing ? (
							<ButtonGroup>
								<Button
									_hover={{ bgColor: 'darkBlue' }}
									bgColor={'lightBlue'}
									onClick={() =>
										inputAudioRef.current && inputAudioRef.current.click()
									}
								>
									{audio ? stringCut(audio.name) : 'Загрузить новый аудиофайл'}
								</Button>
								<Input
									ref={inputAudioRef}
									type='file'
									accept={'audio/*'}
									onChange={e => handleChangeFile(e, setAudio)}
									hidden
								/>
								<Button
									_hover={{ bgColor: 'darkBlue' }}
									bgColor={'lightBlue'}
									onClick={() =>
										inputResourcesRef.current &&
										inputResourcesRef.current.click()
									}
								>
									{resources
										? stringCut(resources.name)
										: 'Загрузить новый архив'}
								</Button>
								<Input
									ref={inputResourcesRef}
									type='file'
									accept='.zip,.rar,.7zip'
									onChange={e => handleChangeFile(e, setResources)}
									hidden
								/>
							</ButtonGroup>
						) : null}
						{track.tags.length ? (
							<TagList tags={track.tags} />
						) : (
							<Text mt={'1em'}>Теги: отсутствуют</Text>
						)}
						<Heading mt={'1em'}>Описание:</Heading>
						{!editing ? (
							track.description ? (
								<Text mt={'1em'}>{track.description}</Text>
							) : (
								<Text mt={'1em'}>Описание отсутствует</Text>
							)
						) : (
							<CustomEditableTextarea
								control={control}
								name={'description'}
								defaultValue={track.description}
							/>
						)}
					</Flex>
				</Box>
			)}
		</>
	)
}

export default TrackScreen
