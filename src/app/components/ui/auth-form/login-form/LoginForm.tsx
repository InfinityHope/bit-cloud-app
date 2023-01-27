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
import { IAuthResponse, ILoginFields } from '@/types/interfaces/auth.interface'
import { useMutation } from 'react-query'
import { AuthService } from '@/services/auth-services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'

const MotionFlex = motion(Flex)

const LoginForm: FC = () => {
	const { setUser, setAuthType } = useAuth()
	const { errorMessage, successMessage } = useNotification()

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

	const { mutate: login } = useMutation(
		'login',
		(data: ILoginFields) => AuthService.login(data),
		{
			onSuccess(data: IAuthResponse) {
				if (setUser) setUser(data.user)
				successMessage('Вы успешно вошли', '')
				reset()
			},

			onError(error: any) {
				if (error.response) {
					errorMessage('Ошибка авторизации', error.response.data.message)
				}
			}
		}
	)

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
