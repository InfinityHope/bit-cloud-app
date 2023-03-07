import Meta from '@/components/meta/Meta'
import { Box, Heading } from '@chakra-ui/react'

const HomeScreen = () => {
	return (
		<>
			<Meta title={'Bit Cloud Home'} />
			<Box p={4} color={'white'}>
				<Heading as='h2'>Welcome to Bit Cloud App</Heading>
			</Box>
		</>
	)
}

export default HomeScreen
