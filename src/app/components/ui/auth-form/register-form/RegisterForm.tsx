import React, { FC, useState } from 'react'
import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement
} from '@chakra-ui/react'
import { ArrowBackIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styles from '../AuthForm.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthResponse, IRegisterFields } from '@/types/interfaces/auth.interface'
import { useMutation } from 'react-query'
import { AuthService } from '@/services/auth-services/auth.service'
import { useMaskInput } from '@/hooks/useMaskInput'

const RegisterForm: FC = () => {
	const { setAuthType, setUser } = useAuth()
	const { errorMessage, successMessage } = useNotification()
	const { handlePhoneInput } = useMaskInput()
	const [showPass, setShowPass] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, defaultValues }
	} = useForm<IRegisterFields>({
		mode: 'onSubmit',
		defaultValues: {
			isMusician: false
		}
	})

	const { mutate: registration } = useMutation(
		'login',
		(data: IRegisterFields) => AuthService.register(data),
		{
			onSuccess(data: IAuthResponse) {
				if (setUser) setUser(data.user)
				successMessage('Вы успешно зарегестрировались', '')
				reset()
			},

			onError(error: any) {
				if (error.response) {
					errorMessage('Ошибка регистрации', error.response.data.message)
				}
			}
		}
	)

	const onSubmit: SubmitHandler<IRegisterFields> = data => registration(data)

	return (
		<Flex as={'form'} className={styles.AuthForm} onSubmit={handleSubmit(onSubmit)}>
			<Button
				onClick={() => setAuthType('login')}
				variant={'outline'}
				position={'absolute'}
				colorScheme={''}
				top={25}
				left={15}
			>
				<ArrowBackIcon />
			</Button>
			<Heading as='h2' size='xl'>
				Регистрация
			</Heading>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel>E-mail</FormLabel>
				<Input
					type='email'
					{...register('email', {
						required: 'Поле обязательно для заполнения"',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Неверный формат E-mail '
						}
					})}
				/>
				{errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel>Пароль</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={showPass ? 'text' : 'password'}
						{...register('password', {
							required: 'Поле обязательно для заполнения',
							min: 'Пароль должен быть не менее 4 символов',
							max: 'Пароль должен быть не более 16 символов'
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
			<FormControl isInvalid={!!errors.name}>
				<FormLabel>Имя</FormLabel>
				<Input
					type='text'
					{...register('name', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
				{errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.nickName}>
				<FormLabel>Никнейм</FormLabel>
				<Input
					type='text'
					{...register('nickName', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
				{errors.nickName && <FormErrorMessage>{errors.nickName?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.telephone}>
				<FormLabel>Телефон</FormLabel>
				<InputGroup>
					<InputLeftElement pointerEvents='none' children={<PhoneIcon color='white' />} />
					<Input
						type='tel'
						maxLength={18}
						onInput={handlePhoneInput}
						{...register('telephone', {
							required: 'Поле обязательно для заполнения',
							pattern: {
								value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
								message: 'Некорректный номер телефона'
							}
						})}
					/>
				</InputGroup>
				{errors.telephone && (
					<FormErrorMessage>{errors.telephone?.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl>
				<Checkbox checked={defaultValues?.isMusician} {...register('isMusician')}>
					Зарегестрироваться как исполнитель?
				</Checkbox>
			</FormControl>
			<Button
				size={'lg'}
				colorScheme={'facebook'}
				variant={'solid'}
				width={'100%'}
				type={'submit'}
			>
				Зарегестрироваться
			</Button>
		</Flex>
	)
}

export default RegisterForm
