import React, { FC } from 'react'
import styles from '@/ui/musician-profile/MusicianProfile.module.scss'
import { Avatar, Box, Divider, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { IUser } from '@/types/interfaces/user.interface'

const MusicianProfileHeader: FC<{ user: IUser }> = ({ user }) => {
	return (
		<Box className={styles.MusicianProfileHeader}>
			<Heading as={'h2'} size={'4xl'} marginBottom={'0.5em'}>
				{user.nickName}
			</Heading>

			<Divider color={'secondary'} marginBottom={'0.5em'} />

			<Text>E-mail: {user.email}</Text>
			<Flex flexDirection={'column'}>
				<Text>Социальные сети:</Text>
				<List>
					{user.socialLinks.map(link => (
						<ListItem key={link}>
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
	)
}

export default MusicianProfileHeader
