import React, { FC } from 'react'
import { IUser } from '@/types/interfaces/user.interface'
import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	Link,
	List,
	ListItem,
	Stack,
	Text
} from '@chakra-ui/react'
import styles from './MusicianProfile.module.scss'

const MusicianProfile: FC<{ user: IUser }> = ({ user }) => {
	return (
		<Flex flexDirection={'column'} className={styles.MusicianProfile}>
			<Box bg='secondary' className={styles.MusicianProfileHeader}>
				<Heading as={'h2'} size={'4xl'} marginBottom={'0.5em'}>
					{user.nickName}
				</Heading>

				<Divider color={'secondary'} marginBottom={'0.5em'} />

				<Text>E-mail: {user.email}</Text>
				<Flex flexDirection={'column'}>
					<Text>Социальные сети:</Text>
					<List>
						{user.socialLinks.map(link => (
							<ListItem>
								<Link href={`https://${link}`} target={'_blank'}>
									{link}
								</Link>
							</ListItem>
						))}
					</List>
				</Flex>
				<Avatar
					src={`${process.env.API_URL}/${user.avatar}`}
					name={user.avatar}
					boxSize={'10em'}
				/>
			</Box>
			<Heading as={'h3'} size={'xl'}>
				Музыка автора
			</Heading>
			<Stack spacing={4}>
				{user.tracks.map(track => (
					<div>
						<audio src={`${process.env.API_URL}/${track.audio}`}></audio>
					</div>
				))}
			</Stack>
		</Flex>
	)
}

export default MusicianProfile
