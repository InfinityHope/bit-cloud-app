import { API_URL } from '@/app/constants/api.constants'
import noAvatar from '@/assets/noAvatar.png'
import { animationsConfig } from '@/config/animations.config'
import { IUser } from '@/types/interfaces/user.interface'
import { Avatar, Grid, GridItem, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'

const MotionGridItem = motion(GridItem)

const MusiciansList: FC<{ musicians: IUser[] }> = ({ musicians }) => {
	return (
		<Grid p={4} marginTop={8} templateColumns='repeat(7, 1fr)' gap={6}>
			{musicians.map((musician, index) => (
				<Link key={musician.id} href={`/musicians/${musician.nickName}`}>
					<MotionGridItem
						width={'100%'}
						textAlign={'center'}
						variants={animationsConfig}
						initial={'listInitialTop'}
						animate={'listAnimateTop'}
						custom={index}
					>
						<Avatar
							size='xl'
							src={
								musician?.avatar === 'image/noAvatar.png'
									? noAvatar.src
									: `${API_URL}/${musician?.avatar}`
							}
						/>
						<Text color={'primaryTextColor'} fontWeight={'semibold'} marginTop={2}>
							{musician.nickName}
						</Text>
					</MotionGridItem>
				</Link>
			))}
		</Grid>
	)
}

export default MusiciansList
