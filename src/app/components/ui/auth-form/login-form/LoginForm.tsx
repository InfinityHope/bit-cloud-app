import React, { FC } from 'react'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text
} from '@chakra-ui/react'
import styles from '../AuthForm.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginFields } from '@/types/interfaces/auth.interface'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'
import { useLogin } from '@/hooks/auth-hooks/useLogin'

const MotionFlex = motion(Flex)

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ILoginFields>({
		mode: 'onSubmit',
		defaultValues: {
			email: 'exmaple@example.ru',
			password: 'example123'
		}
	})

	const { setAuthType } = useAuth()
	const login = useLogin(reset)

	const onSubmit: SubmitHandler<ILoginFields> = data => login(data)

	return (
		<MotionFlex
			as={'form'}
			className={styles.AuthForm}
			onSubmit={handleSubmit(onSubmit)}
			initial={'initialFadeScale'}
			animate={'animateFadeScale'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.4
			}}
			variants={animationsConfig}
		>
			<Heading as='h2' size='xl'>
				Войти
			</Heading>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel>E-mail</FormLabel>
				<Input
					{...register('email', {
						required: 'Поле обязательно для заполнения"',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Неверный формат E-mail '
						}
					})}
					type='email'
				/>
				{errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel>Пароль</FormLabel>
				<Input
					{...register('password', {
						required: 'Поле обязательно для заполнения'
					})}
					type='password'
				/>
				{errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
			</FormControl>
			<Button
				size={'lg'}
				variant={'solid'}
				width={'100%'}
				type={'submit'}
				colorScheme={'facebook'}
			>
				Войти
			</Button>
			<Box marginTop={'25px'}>
				<Text>
					Нет аккаунта?{' '}
					<Button variant={'link'} onClick={() => setAuthType('register')}>
						Зарегестрироваться
					</Button>
				</Text>
			</Box>
		</MotionFlex>
	)
}

export default LoginForm
