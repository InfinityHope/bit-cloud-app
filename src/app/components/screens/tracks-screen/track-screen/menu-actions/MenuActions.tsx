import { DeleteAlert } from '@/components/ui/'
import { API_URL } from '@/constants/api.constants'
import { useDeleteTrack, useDownloadAudio } from '@/hooks/tracks-hooks'
import { ITrack } from '@/types/interfaces/track.interface'
import { createDownloadUrl } from '@/utils/createDownloadUrl'
import { ChevronDownIcon, DeleteIcon, DownloadIcon, EditIcon, LinkIcon } from '@chakra-ui/icons'
import {
	Box,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useDisclosure
} from '@chakra-ui/react'
import { FC, useRef } from 'react'

interface IMenuActions {
	track: ITrack
	setEditing: (value: boolean) => void
}

const MenuActions: FC<IMenuActions> = ({ track, setEditing }) => {
	const data = useDownloadAudio(track)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteTrack = useDeleteTrack({ track, onClose })
	const cancelRef = useRef<any>()

	return (
		<Box mt={'2em'}>
			<Menu>
				<MenuButton>
					Действия <ChevronDownIcon />
				</MenuButton>
				<MenuList>
					<MenuItem icon={<DeleteIcon />} onClick={onOpen}>
						Удалить
					</MenuItem>
					<MenuItem onClick={() => setEditing(true)} icon={<EditIcon />}>
						Обновить
					</MenuItem>
					<MenuDivider />
					<MenuItem
						as={'a'}
						icon={<DownloadIcon />}
						href={`${API_URL}/${track.resources}`}
						download
					>
						Скачать архив
					</MenuItem>
					<MenuItem onClick={() => createDownloadUrl(data, track)} icon={<LinkIcon />}>
						Скачать аудио
					</MenuItem>
				</MenuList>
			</Menu>
			<DeleteAlert
				isOpen={isOpen}
				cancelRef={cancelRef}
				onClose={onClose}
				deleteTrack={deleteTrack}
				onCloseHandler={onClose}
			/>
		</Box>
	)
}

export default MenuActions
