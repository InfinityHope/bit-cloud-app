import React, { FC, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import SearchInput from '@/ui/header/search-input/SearchInput'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from '@/hooks/useHistory'

const Header: FC = () => {
	const { back, history, setHistory } = useHistory()

	useEffect(() => {
		console.log(history)
	}, [history])

	return (
		<header>
			<Flex color={'primaryTextColor'} alignItems={'center'} justifyContent={'space-between'}>
				<Heading as='h1' size='xl' noOfLines={1}>
					Sound Cloud App
				</Heading>

				<Flex justifyContent={'space-between'} alignItems={'center'} width={'80%'}>
					<Button variant={'outline'} colorScheme={''} onClick={back}>
						<ArrowBackIcon />
					</Button>
					<Flex justifyContent={'space-between'} alignItems={'center'} width={'40%'}>
						<SearchInput />
						<Link href={'/profile'}>Профиль</Link>
					</Flex>
				</Flex>
			</Flex>
		</header>
	)
}

export default Header
