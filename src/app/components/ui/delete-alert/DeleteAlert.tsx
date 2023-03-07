import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button
} from '@chakra-ui/react'
import { FC, MouseEvent, useRef } from 'react'

interface IDeleteAlert {
	isOpen: boolean
	onClose: () => void
	onCloseHandler: (e: MouseEvent<HTMLButtonElement>) => void
	deleteTrack: () => void
}

const DeleteAlert: FC<IDeleteAlert> = ({ isOpen, onCloseHandler, onClose, deleteTrack }) => {
	const cancelRef = useRef<HTMLButtonElement | null>(null)

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			motionPreset={'slideInBottom'}
		>
			<AlertDialogOverlay>
				<AlertDialogContent bgColor={'primary'} color={'#fff'}>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Удалить трек
					</AlertDialogHeader>

					<AlertDialogBody>Вы уверены, что хотите удалить трек?</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme='red' onClick={() => deleteTrack()}>
							Удалить
						</Button>
						<Button ml={3} onClick={onCloseHandler} ref={cancelRef}>
							Отменить
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeleteAlert
