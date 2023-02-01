import React, { FC } from 'react'
import { IUser } from '@/types/interfaces/user.interface'
import { Avatar, Grid, GridItem, Text } from '@chakra-ui/react'
import Link from 'next/link'

const MusiciansList: FC<{ users: IUser[] }> = ({ users }) => {
	return (
		<Grid templateColumns='repeat(7, 1fr)' gap={6}>
			{users.map(user => (
				<Link href={`/musicians/${user.nickName}`}>
					<GridItem width={'100%'} textAlign={'center'}>
						<Avatar size='xl' src={`${process.env.API_URL}/${user.avatar}`} />
						<Text color={'primaryTextColor'} fontWeight={'semibold'} marginTop={2}>
							{user.nickName}
						</Text>
					</GridItem>
				</Link>
			))}
		</Grid>
	)
}

export default MusiciansList
