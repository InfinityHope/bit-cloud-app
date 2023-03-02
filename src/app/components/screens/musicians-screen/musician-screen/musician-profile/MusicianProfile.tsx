import { checkSocialLink } from '@/app/utils/checkSocialLink'
import bgImg from '@/assets/background.jpg'
import { PageHeader, TrackList } from '@/components/ui'
import { ITrack } from '@/types/interfaces/track.interface'
import { IUser } from '@/types/interfaces/user.interface'
import { Avatar, Divider, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import styles from './MusicianProfile.module.scss'

interface IMusicianProfile {
	musician: IUser
	tracks: ITrack[]
}

const MusicianProfile: FC<IMusicianProfile> = ({ musician, tracks }) => {
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
									{checkSocialLink(link)}
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
			{tracks.length > 0 ? (
				<TrackList tracks={tracks} />
			) : (
				<Text mt={'2em'} ml={'1.5em'} fontSize={'x-large'}>
					У данного автора пока нет треков
				</Text>
			)}
		</Flex>
	)
}

export default MusicianProfile
