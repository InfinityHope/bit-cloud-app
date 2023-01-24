import React, { FC } from 'react'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input
} from '@chakra-ui/react'
import Link from 'next/link'
import styles from '../AuthForm.module.scss'

const LoginForm: FC = () => {
	return (
		<Flex className={styles.AuthForm}>
			<Heading as='h2' size='xl'>
				Войти
			</Heading>
			<FormControl isRequired>
				<FormLabel>E-mail</FormLabel>
				<Input type='email' />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Пароль</FormLabel>
				<Input type='password' />
			</FormControl>
			<Button
				size={'lg'}
				variant={'solid'}
				width={'100%'}
				colorScheme={'facebook'}
			>
				Войти
			</Button>
			<Box marginTop={'25px'}>
				<Link href={'/register'}>Нет аккаунта? Зарегестрироваться</Link>
			</Box>
		</Flex>
	)
}

export default LoginForm
