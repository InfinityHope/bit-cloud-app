import { IUser } from '@/types/interfaces/user.interface'
import { Flex, Heading, Text } from '@chakra-ui/react'
import styles from './MusicianProfile.module.scss'
import MusicList from '@/ui/music-list/MusicList'
import { FC } from 'react'
import MusicianProfileHeader from '@/ui/musician-profile/musician-profile-header/MusicianProfileHeader'

const MusicianProfile: FC<{ user: IUser }> = ({ user }) => {
	return (
		<Flex flexDirection={'column'} className={styles.MusicianProfile}>
			<MusicianProfileHeader user={user} />
			<Heading as={'h3'} size={'xl'}>
				Музыка автора
			</Heading>
			{user.tracks.length > 0 ? (
				<MusicList tracks={user.tracks} author={user} />
			) : (
				<Text mt={'2em'} fontSize={'x-large'}>
					У данного автора пока нет треков
				</Text>
			)}
		</Flex>
	)
}

export default MusicianProfile
