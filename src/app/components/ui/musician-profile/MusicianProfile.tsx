import { IUser } from '@/types/interfaces/user.interface'
import { Avatar, Divider, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import MusicList from '@/ui/music-list/MusicList'
import React, { FC } from 'react'
import PageHeader from '@/ui/page-header/PageHeader'
import styles from './MusicianProfile.module.scss'
import bgImg from '@/assets/background.jpg'

const MusicianProfile: FC<{ musician: IUser }> = ({ musician }) => {
	return (
		<Flex flexDirection={'column'} className={styles.MusicianProfile}>
			<PageHeader bgImg={bgImg.src}>
				<Heading as={'h2'} size={'4xl'} marginBottom={'0.5em'}>
					{musician.nickName}
				</Heading>

				<Divider color={'secondary'} marginBottom={'0.5em'} />

				<Text>E-mail: {musician.email}</Text>
				<Flex flexDirection={'column'}>
					<Text>Социальные сети:</Text>
					<List>
						{musician.socialLinks.map(link => (
							<ListItem key={link}>
								<Link href={`https://${link}`} target={'_blank'}>
									{link}
								</Link>
							</ListItem>
						))}
					</List>
				</Flex>
				<Avatar
					src={`${process.env.API_URL}/${musician.avatar}`}
					name={musician.avatar}
					boxSize={'10em'}
				/>
			</PageHeader>
			<Heading as={'h3'} size={'xl'}>
				Музыка автора
			</Heading>
			{musician.tracks.length > 0 ? (
				<MusicList tracks={musician.tracks} author={musician} />
			) : (
				<Text mt={'2em'} fontSize={'x-large'}>
					У данного автора пока нет треков
				</Text>
			)}
		</Flex>
	)
}

export default MusicianProfile
