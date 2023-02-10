import React, { FC } from 'react'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button
} from '@chakra-ui/react'

interface IDeleteAlert {
	isOpen: boolean
	cancelRef: any
	onClose: () => void
	deleteTrack: () => void
}

const DeleteAlert: FC<IDeleteAlert> = ({ isOpen, cancelRef, onClose, deleteTrack }) => {
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Удалить трек
					</AlertDialogHeader>

					<AlertDialogBody>Вы уверены, что хотите удалить трек?</AlertDialogBody>

					<AlertDialogFooter>
						<Button onClick={onClose} ref={cancelRef}>
							Отменить
						</Button>
						<Button colorScheme='red' onClick={() => deleteTrack()} ml={3}>
							Удалить
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeleteAlert
