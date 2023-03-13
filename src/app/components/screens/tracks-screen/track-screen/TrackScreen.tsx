import { useActions, useAppSelector } from '@/app/hooks/redux-hooks'
import { useUpdateTrack } from '@/app/hooks/tracks-hooks/useUpdateTrack'
import { updateTrackActions } from '@/app/store/reducers/update-track.reducer'
import { ITrackFields } from '@/app/types/interfaces/track.interface'
import Meta from '@/components/meta/Meta'
import { CustomEditableTextarea, CustomSpinner, FileActions, TagList } from '@/components/ui'
import { useTrack } from '@/hooks/tracks-hooks'
import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TrackPageHeader from './track-screen-header/TrackScreenHeader'

const TrackScreen = () => {
	const { query } = useRouter()
	const trackId = Number(query?.id)
	const { track, isLoading } = useTrack(trackId)

	const { control, handleSubmit, reset } = useForm<ITrackFields>()

	const [isLargerThan500] = useMediaQuery('(min-width: 500px)', {
		ssr: true,
		fallback: false
	})

	const { editing, audio, resources, img, audioDuration, tags } = useAppSelector(
		state => state.updateTrack
	)
	const {
		setAudio,
		setResources,
		setAudioDuration,
		setEditing,
		clearState,
		addTag,
		removeTag,
		clearTags,
		setTags
	} = useActions(updateTrackActions)

	useEffect(() => {
		if (editing) {
			setTags(track?.tags)
		} else {
			clearTags()
		}
	}, [editing])

	useEffect(() => {
		return () => setEditing(false)
	}, [])

	const update = useUpdateTrack(Number(trackId))

	const onSubmit: SubmitHandler<ITrackFields> = data => {
		const formData: FormData = new FormData()
		if (track) {
			formData.append('audio', audio ? audio : track.audio)
			formData.append(
				'audio_duration',
				audioDuration ? String(audioDuration) : String(track.audio_duration)
			)
			formData.append('resources', resources ? resources : track.resources)
			formData.append('img', img ? img : track.img)
			formData.append('title', data.title ? data.title : track.title)
			formData.append('description', data.description)
			formData.append('tags', tags.join(','))

			update(formData)

			setEditing(false)
			clearState()
			reset()
		}
	}

	return (
		<>
			<Meta title={`Bit Cloud Track: ${track?.title}`} />
			{isLoading ? <CustomSpinner /> : null}
			{track && (
				<Box p={isLargerThan500 ? '3em' : '.5em'} color={'white'} overflowY={'auto'}>
					<TrackPageHeader
						control={control}
						handleSubmit={handleSubmit}
						reset={reset}
						onSubmit={onSubmit}
						track={track}
					/>
					<Flex mt={'1em'} flexDirection={'column'}>
						{editing && (
							<FileActions
								audio={audio}
								resources={resources}
								setAudio={setAudio}
								setAudioDuration={setAudioDuration}
								setResources={setResources}
							/>
						)}

						{editing ? (
							<TagList tags={tags} addTag={addTag} removeTag={removeTag} />
						) : track.tags.length > 0 ? (
							<TagList tags={track.tags} action={false} />
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
