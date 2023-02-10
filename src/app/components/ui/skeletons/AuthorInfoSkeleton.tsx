import { FC } from 'react'
import { Box, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

const AuthorInfoSkeleton: FC = () => {
	return (
		<Box>
			<Stack position={'relative'}>
				<Skeleton mt='4' minHeight={'250px'} borderRadius={'10px'} padding={'60px'} />
				<Stack left={'5%'} top={'40%'} w={'85%'} position={'absolute'} spacing={4}>
					<Skeleton height='10px' width={'40%'} />
					<Skeleton height='10px' width={'full'} />
					<Skeleton height='10px' width={'20%'} />
					<Skeleton height='10px' width={'20%'} />
				</Stack>
				<SkeletonCircle
					position={'absolute'}
					boxSize={'10em'}
					bottom={'-3em'}
					right={'10%'}
				/>
			</Stack>
			<Skeleton marginTop={'5em'} height='20px' width={'30%'} />
			<Stack marginTop={'4em'} spacing={5}>
				<Skeleton height='30px' />
				<Skeleton height='30px' />
				<Skeleton height='30px' />
				<Skeleton height='30px' />
			</Stack>
		</Box>
	)
}

export default AuthorInfoSkeleton
