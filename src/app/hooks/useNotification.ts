import { useToast } from '@chakra-ui/react'

export const useNotification = () => {
	const toast = useToast()

	const errorMessage = (title: string, description: string) => {
		toast({
			title,
			description,
			status: 'error',
			duration: 3000,
			isClosable: true,
			position: 'bottom-left'
		})
	}
	const successMessage = (title: string, description: string) => {
		toast({
			title: title,
			description,
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'bottom-left'
		})
	}

	return { errorMessage, successMessage }
}
