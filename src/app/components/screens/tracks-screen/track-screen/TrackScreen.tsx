import Meta from '@/components/meta/Meta'
import { CustomSpinner, TagList, TrackMenuActions } from '@/components/ui'
import { API_URL } from '@/constants/api.constants'
import { useAuth } from '@/hooks/auth-hooks'
import { useTrack } from '@/hooks/tracks-hooks'
import {
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	EditableTextarea,
	Flex,
	Heading,
	Image,
	Input,
	Text,
	Textarea
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const TrackScreen = () => {
	const { query } = useRouter()
	const [editing, setEditing] = useState(false)
	const { user } = useAuth()
	const trackId = query?.id

	const { track, isLoading } = useTrack(Number(trackId))

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
							src={`${API_URL}/${track.img}`}
							alt={track.img}
							mr={'1em'}
						/>
						<Flex flexDirection={'column'}>
							{!editing ? (
								<Heading as={'h3'}>{track.title}</Heading>
							) : (
								<Editable
									fontSize={'4xl'}
									lineHeight={'1.2em'}
									fontWeight={'bold'}
									defaultValue={track.title}
								>
									<EditablePreview />
									<Input variant={'flushed'} as={EditableInput} />
								</Editable>
							)}

							<Text mt={'1em'} fontSize={'1.5em'}>
								Автор: {track.author.nickName}
							</Text>

							<Text fontSize={'1.5em'} mt={'1em'}>
								Дата создания:{' '}
								{new Date(track.createdAt).toLocaleDateString('ru', {})}
							</Text>

							<Text fontSize={'1.5em'} mt={'1em'}>
								Дата последнего обновления:{' '}
								{new Date(track.updatedAt).toLocaleDateString('ru', {})}
							</Text>

							{user?.id === track.userId ? (
								<TrackMenuActions
									editing={editing}
									setEditing={setEditing}
									track={track}
								/>
							) : null}
						</Flex>
					</Flex>
					<Flex mt={'1em'} flexDirection={'column'}>
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
							<Editable
								mt={'1em'}
								defaultValue={
									track.description ? track.description : 'Изменить описание...'
								}
							>
								<EditablePreview />
								<Textarea as={EditableTextarea} />
							</Editable>
						)}
					</Flex>
				</Box>
			)}
		</>
	)
}

export default TrackScreen
