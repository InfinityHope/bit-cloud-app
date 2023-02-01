import { Flex, Spinner } from '@chakra-ui/react'

const CustomSpinner = () => {
	return (
		<Flex justifyContent={'center'} alignItems={'center'} h={'100%'}>
			<Spinner size={'xl'} boxSize={'340px'} speed='0.65s' />
		</Flex>
	)
}

export default CustomSpinner
