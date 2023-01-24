import React, { FC } from 'react'
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import styles from '../AuthForm.module.scss'
import Link from 'next/link'

const LoginForm: FC = () => {
	return (
		<Flex className={styles.AuthForm}>
			<Link href={'/login'}>
				<Button
					variant={'outline'}
					position={'absolute'}
					top={-30}
					left={15}
				>
					<ArrowBackIcon />
				</Button>
			</Link>
			<Heading as='h2' size='xl'>
				Регистрация
			</Heading>
			<FormControl isRequired>
				<FormLabel>E-mail</FormLabel>
				<Input type='email' />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Пароль</FormLabel>
				<Input type='password' />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Пароль</FormLabel>
				<Input type='password' />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Пароль</FormLabel>
				<Input type='password' />
			</FormControl>
			<Button size={'lg'} variant={'solid'} width={'100%'}>
				Зарегестрироваться
			</Button>
		</Flex>
	)
}

export default LoginForm
