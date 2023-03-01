import { animationsConfig } from '@/config/animations.config'
import { useAuth, useLogin } from '@/hooks/auth-hooks'
import { ILoginFields } from '@/types/interfaces/auth.interface'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../AuthForm.module.scss'

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
			email: 'example@example.com',
			password: 'example123'
		}
	})

	const [showPass, setShowPass] = useState<boolean>(false)
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
				<InputGroup>
					<Input
						type={showPass ? 'text' : 'password'}
						{...register('password', {
							required: 'Поле обязательно для заполнения'
						})}
					/>
					<InputRightElement>
						<Button
							colorScheme={''}
							variant={'link'}
							onClick={() => setShowPass(!showPass)}
						>
							{showPass ? <ViewOffIcon /> : <ViewIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
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
						Зарегистрироваться
					</Button>
				</Text>
			</Box>
		</MotionFlex>
	)
}

export default LoginForm
