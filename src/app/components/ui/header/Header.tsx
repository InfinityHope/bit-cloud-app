import React, { FC } from 'react'
import { Avatar, Button, Flex, Heading } from '@chakra-ui/react'
import SearchInput from '@/ui/header/search-input/SearchInput'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from '@/hooks/useHistory'
import { useAuth } from '@/hooks/useAuth'

const Header: FC = () => {
	const { back } = useHistory()
	const { user } = useAuth()

	return (
		<header>
			<Flex color={'primaryTextColor'} alignItems={'center'} justifyContent={'space-between'}>
				<Heading as='h1' size='xl' noOfLines={1}>
					Sound Cloud
				</Heading>

				<Flex justifyContent={'space-between'} alignItems={'center'} width={'80%'}>
					<Button variant={'outline'} colorScheme={''} onClick={back}>
						<ArrowBackIcon />
					</Button>
					<Flex justifyContent={'space-between'} alignItems={'center'} width={'40%'}>
						<SearchInput />
						<Link href={'/profile'}>
							<Avatar src={`${process.env.API_URL}/${user?.avatar}`} />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</header>
	)
}

export default Header
