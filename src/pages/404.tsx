import { Flex, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'

const NotFound: NextPage = () => {
	return (
		<Flex justifyContent={'center'} alignItems={'center'} color={'white'}>
			<Heading>Page is Not Found</Heading>
		</Flex>
	)
}

export default NotFound
