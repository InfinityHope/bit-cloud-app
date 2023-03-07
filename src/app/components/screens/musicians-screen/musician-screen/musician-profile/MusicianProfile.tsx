import { checkSocialLink } from '@/app/utils/checkSocialLink'
import bgImg from '@/assets/background.jpg'
import { PageHeader, TrackList } from '@/components/ui'
import { ITrack } from '@/types/interfaces/track.interface'
import { IUser } from '@/types/interfaces/user.interface'
import {
	Avatar,
	Divider,
	Flex,
	Heading,
	Link,
	List,
	ListItem,
	Text,
	useMediaQuery
} from '@chakra-ui/react'
import { FC } from 'react'
import styles from './MusicianProfile.module.scss'

interface IMusicianProfile {
	musician: IUser
	tracks: ITrack[]
}

const MusicianProfile: FC<IMusicianProfile> = ({ musician, tracks }) => {
	const [isLargerThan500] = useMediaQuery('(min-width: 500px)', {
		ssr: true,
		fallback: false
	})

	return (
		<Flex flexDirection={'column'} className={styles.MusicianProfile}>
			<PageHeader bgImg={bgImg.src}>
				<Heading as={'h2'} marginBottom={'0.5em'}>
					{musician.nickName}
				</Heading>

				<Divider color={'secondary'} marginBottom={'0.5em'} />

				<Text>E-mail: {musician.email}</Text>
				<Text>Имя: {musician.name}</Text>
				<Text>Телефон: {musician.telephone}</Text>
				<Flex>
					<Text>Социальные сети:</Text>
					{musician.socialLinks.length !== 0 ? (
						<List display={'flex'}>
							{musician.socialLinks.map(link => (
								<ListItem ml={'.5em'} key={link} fontWeight={'bold'}>
									<Link href={`https://${link}`} target={'_blank'}>
										{checkSocialLink(link)}
									</Link>
								</ListItem>
							))}
						</List>
					) : (
						<Text ml={'.5em'}>Отсутствуют</Text>
					)}
				</Flex>
				<Avatar
					src={`${process.env.API_URL}/${musician.avatar}`}
					name={musician.avatar}
					boxSize={isLargerThan500 ? '10em' : '4em'}
				/>
			</PageHeader>
			<Heading size={isLargerThan500 ? '2xl' : 'lg'} as={'h3'}>
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
