import { useAuth } from '@/app/hooks/auth-hooks'
import { useAuthorTracks } from '@/app/hooks/tracks-hooks'
import { useUpdateProfile } from '@/app/hooks/user-hooks/useUpdateProfile'
import { IProfileFields } from '@/app/types/interfaces/user.interface'
import Meta from '@/components/meta/Meta'
import { CustomEditableInput, UploadImage } from '@/components/ui'
import { Box, Button, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsArrowUpRightSquare } from 'react-icons/bs'
import SocialLinks from './social-links/SocialLinks'

const ProfileScreen = () => {
	const { user } = useAuth()
	const { tracks } = useAuthorTracks(user?.id)

	const [isLargerThan700] = useMediaQuery('(min-width: 700px)', {
		ssr: true,
		fallback: false
	})

	const { handleSubmit, control, reset } = useForm<IProfileFields>()

	const [socialLinks, setSocialLinks] = useState<string[]>([])
	const [avatar, setAvatar] = useState<Blob | null>(null)
	const [editing, setEditing] = useState<boolean>(false)
	const [userId, setUserId] = useState<number>(0)

	const { updateProfile } = useUpdateProfile(userId)

	useEffect(() => {
		if (!editing) {
			reset()
		}
	}, [editing])

	useEffect(() => {
		if (user) {
			setSocialLinks(user.socialLinks)
			setUserId(user.id)
		}
	}, [user, editing])

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
				<Box p={isLargerThan700 ? '3em' : '1em'} color={'white'} overflowY={'auto'}>
					<Flex
						flexDirection={isLargerThan700 ? 'row' : 'column'}
						alignItems={'center'}
						fontSize={isLargerThan700 ? '2xl' : 'lg'}
					>
						<UploadImage
							upload={editing}
							image={avatar}
							setImage={setAvatar}
							width={isLargerThan700 ? '300px' : '200px'}
							height={isLargerThan700 ? '300px' : '200px'}
							initialImage={user.avatar}
							borderRadius={'full'}
						/>
						<Flex
							ml={isLargerThan700 ? '3em' : '0'}
							mt={!isLargerThan700 ? '2em' : '0'}
							flexDirection={'column'}
						>
							{!editing ? (
								<Heading as={'h3'}>{user.nickName}</Heading>
							) : (
								<Box>
									<CustomEditableInput
										name={'nickName'}
										control={control}
										defaultValue={user.nickName}
										isRequired
										fontSize={isLargerThan700 ? '2xl' : 'lg'}
										fontWeight='bold'
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'}>Имя: {user.name}</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'name'}
										control={control}
										fontSize={isLargerThan700 ? '2xl' : 'lg'}
										defaultValue={user.name}
										isRequired
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'}>E-mail: {user.email}</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'email'}
										control={control}
										defaultValue={user.email}
										isRequired
										fontSize={isLargerThan700 ? '2xl' : 'lg'}
										pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
										patternMessage={'Некорректный формат E-mail'}
									/>
								</Box>
							)}
							{!editing ? (
								<Text mt={'1em'}>Телефон: {user.telephone}</Text>
							) : (
								<Box mt={'1em'}>
									<CustomEditableInput
										name={'telephone'}
										control={control}
										isMobileInput
										fontSize={isLargerThan700 ? '2xl' : 'lg'}
										defaultValue={user.telephone}
										isRequired
										pattern={
											/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
										}
										patternMessage={'Некорректный номер телефона'}
									/>
								</Box>
							)}
							<SocialLinks
								editing={editing}
								setSocialLinks={setSocialLinks}
								socialLinks={socialLinks}
							/>
							{user.role === 'MUSICIAN' && (
								<Text mt={'1em'}>Кол-во треков: {tracks?.length}</Text>
							)}
						</Flex>
					</Flex>

					<Flex
						width={'full'}
						flexDirection={isLargerThan700 ? 'row' : 'column'}
						justifyContent={!isLargerThan700 ? 'center' : 'flex-start'}
						alignItems={!isLargerThan700 ? 'center' : 'flex-start'}
						mt={'3em'}
					>
						{!editing ? (
							<Button
								mt={'1em'}
								type={'button'}
								mr={'1em'}
								onClick={() => setEditing(true)}
							>
								Редактировать
							</Button>
						) : (
							<>
								<Button mt={'1em'} onClick={handleSubmit(onSubmit)} mr={'1em'}>
									Сохранить
								</Button>
								<Button mt={'1em'} mr={'1em'} onClick={() => setEditing(false)}>
									Отменить
								</Button>
							</>
						)}
						<Button mt={'1em'} rightIcon={<BsArrowUpRightSquare />}>
							<Link href={'my-tracks'}>Перейти к моим трекам</Link>
						</Button>
					</Flex>
				</Box>
			)}
		</>
	)
}

export default ProfileScreen
