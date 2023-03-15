import { UploadImage } from '@/app/components/ui'
import noAvatar from '@/assets/noAvatar.png'
import { animationsConfig } from '@/config/animations.config'
import { useAuth, useRegister } from '@/hooks/auth-hooks'
import { useMaskInput } from '@/hooks/useMaskInput'
import { IRegisterFields } from '@/types/interfaces/auth.interface'
import { ArrowBackIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
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
import { motion } from 'framer-motion'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../AuthForm.module.scss'

const MotionFlex = motion(Flex)

const RegisterForm = () => {
	const { setAuthType } = useAuth()
	const { handlePhoneInput } = useMaskInput()
	const [image, setImage] = useState<Blob | null>(null)
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

	const registration = useRegister(reset)

	const onSubmit: SubmitHandler<IRegisterFields> = data => {
		const formData = new FormData()
		if (image) {
			formData.append('avatar', image)
		}
		formData.append('email', data.email)
		formData.append('password', data.password)
		formData.append('name', data.name)
		formData.append('nickName', data.nickName)
		formData.append('telephone', data.telephone)
		formData.append('isMusician', data.isMusician.toString())

		setImage(null)
		registration(formData)
	}

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
			<FormControl width={'fit-content'} textAlign={'center'} marginTop={'1.5em'}>
				<UploadImage
					upload={true}
					setImage={setImage}
					image={image}
					initialImage={noAvatar.src}
					width={'100px'}
					height={'100px'}
					borderRadius={'full'}
				/>
			</FormControl>
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
							minLength: {
								value: 4,
								message: 'Пароль должен быть более 4 символов'
							},
							maxLength: {
								value: 16,
								message: 'Пароль должен быть менее 16 символов'
							}
						})}
					/>
					<InputRightElement>
						<Button
							variant={'link'}
							onMouseUp={() => setShowPass(false)}
							onMouseDown={() => setShowPass(true)}
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
					Зарегистрироваться как исполнитель?
				</Checkbox>
			</FormControl>
			<Button width={'100%'} type={'submit'}>
				Зарегистрироваться
			</Button>
		</MotionFlex>
	)
}

export default RegisterForm
