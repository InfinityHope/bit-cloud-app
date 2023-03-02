import { animationsConfig } from '@/app/config/animations.config'
import { API_URL } from '@/app/constants/api.constants'
import { useAuth } from '@/app/hooks/auth-hooks'
import { useAuthorTracks } from '@/app/hooks/tracks-hooks'
import { useNotification } from '@/app/hooks/useNotification'
import { useUpdateProfile } from '@/app/hooks/user-hooks/useUpdateProfile'
import { IProfileFields } from '@/app/types/interfaces/user.interface'
import { checkSocialLink } from '@/app/utils/checkSocialLink'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image as Img,
	Input,
	Link,
	List,
	ListItem,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiPlus } from 'react-icons/bi'
import Meta from '../../meta/Meta'
import { CustomEditableInput } from '../../ui'

const MotionImage = motion(Img)

const ProfileScreen = () => {
	const { user } = useAuth()
	const { tracks } = useAuthorTracks(user?.id)
	const { onOpen, onClose, isOpen } = useDisclosure()
	const { errorMessage } = useNotification()

	const { handleSubmit, control } = useForm<IProfileFields>({
		mode: 'onBlur'
	})

	const avatarRef = useRef<HTMLInputElement | null>(null)
	const socialLinkRef = useRef<HTMLInputElement | null>(null)

	const [socialLinks, setSocialLinks] = useState<string[]>([])
	const [avatar, setAvatar] = useState<Blob | null>(null)
	const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
	const [editing, setEditing] = useState<boolean>(false)
	const [userId, setUserId] = useState(0)

	const { updateProfile } = useUpdateProfile(userId)

	const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			const image = new Image(300)
			image.src = URL.createObjectURL(file)
			setAvatar(file)
			setAvatarSrc(image.src)
		}
	}

	const addSocialLink = () => {
		if (socialLinkRef.current && socialLinkRef.current.value !== '') {
			// if (
			// 	!socialLinkRef.current.value.includes('t.me') ||
			// 	!socialLinkRef.current.value.includes('vk.com') ||
			// 	!socialLinkRef.current.value.includes('wa.me') ||
			// 	!socialLinkRef.current.value.includes('facebook.com')
			// ) {
			// 	errorMessage('Ошибка', 'Можно добавить только: Facebook, WhatsApp, Vk, Telegram')
			// } else {
			setSocialLinks([...socialLinks, socialLinkRef.current.value])
			socialLinkRef.current.value = ''
			// }
		} else {
			errorMessage('Введите значение', 'Ссылка не может быть пустой')
		}
	}

	useEffect(() => {
		if (user) {
			setSocialLinks(user.socialLinks)
			setUserId(user.id)
		}
	}, [user])

	const onSubmit: SubmitHandler<IProfileFields> = data => {
		if (user) {
			const formData = new FormData()
			formData.append('nickName', data.nickName)
			formData.append('email', data.email)
			formData.append('telephone', data.telephone)
			formData.append('avatar', avatar ? avatar : user?.avatar)
			formData.append('name', data.name)
			formData.append('socialLinks', socialLinks.join(','))
			updateProfile(formData)
			setEditing(false)
		}
	}

	return (
		<>
			<Meta title={`Bit Cloud Profile`} />
			{user && (
				<Box p={'3em'} color={'white'} overflowY={'auto'}>
					<Flex>
						<Box>
							<MotionImage
								variants={animationsConfig}
								initial={'initialFadeScale'}
								animate={'animateFadeScale'}
								transition={{
									opacity: { ease: 'linear' },
									duration: 0.4
								}}
								width={300}
								height={300}
								cursor={editing ? 'pointer' : 'default'}
								border={editing ? '3px solid white' : ''}
								objectFit={'cover'}
								borderRadius={'full'}
								src={avatarSrc ? avatarSrc : `${API_URL}/${user.avatar}`}
								alt={user.avatar}
								onClick={() =>
									avatarRef.current && editing && avatarRef.current.click()
								}
								mr={'1em'}
							/>
							<Input
								ref={avatarRef}
								type='file'
								accept='image/*'
								onChange={changeAvatar}
								hidden
							/>
						</Box>
						<Flex ml={'3em'} flexDirection={'column'}>
							{!editing ? (
								<Heading as={'h3'}>{user.nickName}</Heading>
							) : (
								<Box>
									<CustomEditableInput
										name={'nickName'}
										control={control}
										defaultValue={user.nickName}
										isRequired
										fontWeight='bold'
										fontSize='2xl'
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'} fontSize={'2xl'}>
									Имя: {user.name}
								</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'name'}
										control={control}
										defaultValue={user.name}
										isRequired
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'} fontSize={'2xl'}>
									E-mail: {user.email}
								</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'email'}
										control={control}
										defaultValue={user.email}
										isRequired
										pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
										patternMessage={'Некорректный формат E-mail'}
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'} fontSize={'2xl'}>
									Телефон: {user.telephone}
								</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'telephone'}
										control={control}
										defaultValue={user.telephone}
										isRequired
										pattern={
											/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
										}
										patternMessage={'Некорректный номер телефона'}
									/>
								</Box>
							)}
							{user.socialLinks.length !== 0 ? (
								<Flex mt={'1em'} alignItems={'center'}>
									<Text mr={'1em'} fontSize={'2xl'}>
										Социальные сети:
									</Text>
									<List display={'flex'}>
										{socialLinks.map(link => (
											<ListItem key={link} fontSize={'2xl'} mr={'1em'}>
												<Link href={`https://${link}`}>
													{checkSocialLink(`${link}`)}
												</Link>
											</ListItem>
										))}
									</List>
									{editing && (
										<Popover
											isOpen={isOpen}
											onOpen={onOpen}
											initialFocusRef={socialLinkRef}
											onClose={onClose}
											placement='right'
										>
											<PopoverTrigger>
												<Button
													size={'xs'}
													_hover={{ bgColor: 'darkBlue' }}
													bgColor={'lightBlue'}
													ml={'1em'}
												>
													<BiPlus />
												</Button>
											</PopoverTrigger>
											<PopoverContent p={3} bgColor={'primary'}>
												<PopoverArrow bgColor={'primary'} />
												<PopoverCloseButton />
												<HStack spacing={2} alignItems={'flex-end'}>
													<FormControl>
														<FormLabel>Ссылка</FormLabel>
														<Input
															ref={socialLinkRef}
															onKeyDown={e => {
																if (e.code === 'Enter') {
																	addSocialLink()
																}
															}}
														/>
													</FormControl>
													<Button
														_hover={{ bgColor: 'darkBlue' }}
														bgColor={'lightBlue'}
														onClick={addSocialLink}
													>
														Добавить
													</Button>
												</HStack>
											</PopoverContent>
										</Popover>
									)}
								</Flex>
							) : (
								<Flex>
									<Text mt={'.5em'} fontSize={'2xl'}>
										Соц. сети отсутствуют
									</Text>
								</Flex>
							)}
							<Text mt={'1em'} fontSize={'2xl'}>
								Кол-во треков: {tracks?.length}
							</Text>
						</Flex>
					</Flex>

					{!editing ? (
						<Button
							_hover={{ bgColor: 'darkBlue' }}
							bgColor={'lightBlue'}
							type={'button'}
							onClick={() => {
								setEditing(true)
							}}
						>
							Редактировать
						</Button>
					) : (
						<Button
							_hover={{ bgColor: 'darkBlue' }}
							bgColor={'lightBlue'}
							onClick={handleSubmit(onSubmit)}
						>
							Сохранить
						</Button>
					)}
				</Box>
			)}
		</>
	)
}

export default ProfileScreen
