import { animationsConfig } from '@/app/config/animations.config'
import { API_URL } from '@/app/constants/api.constants'
import { useAuth } from '@/app/hooks/auth-hooks'
import { useAuthorTracks } from '@/app/hooks/tracks-hooks'
import { IProfileFields } from '@/app/types/interfaces/user.interface'
import { Box, Flex, Heading, Image, Link, List, ListItem, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Meta from '../../meta/Meta'

interface IProfileScreen {}

const MotionImage = motion(Image)

const ProfileScreen: FC<IProfileScreen> = ({}) => {
	const { user } = useAuth()
	const { tracks } = useAuthorTracks(user?.id)

	const [socialLinks, setSocialLinks] = useState(user?.socialLinks)
	const [editing, setEditing] = useState(false)

	const { register, handleSubmit } = useForm<IProfileFields>({
		mode: 'onSubmit',
		defaultValues: {
			name: user?.name,
			nickName: user?.nickName,
			email: user?.email,
			telephone: user?.telephone,
			avatar: user?.avatar,
			socialLinks
		}
	})

	const onSubmit: SubmitHandler<IProfileFields> = data => console.log(data)

	return (
		<>
			<Meta title={`Bit Cloud Profile`} />
			{user && (
				<Box
					p={'3em'}
					color={'white'}
					overflowY={'auto'}
					as={'form'}
					onSubmit={handleSubmit(onSubmit)}
				>
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
								objectFit={'cover'}
								borderRadius={'full'}
								src={`${API_URL}/${user.avatar}`}
								alt={user.avatar}
								mr={'1em'}
							/>
						</Box>
						<Flex ml={'3em'} flexDirection={'column'}>
							<Heading as={'h3'}>{user.nickName}</Heading>
							<Text mt={'1em'} fontSize={'2xl'}>
								Имя: {user.name}
							</Text>
							<Text mt={'.5em'} fontSize={'2xl'}>
								E-mail: {user.email}
							</Text>
							<Text mt={'.5em'} fontSize={'2xl'}>
								Телефон: {user.telephone}
							</Text>
							{user.socialLinks.length !== 0 ? (
								<Flex mt={'.5em'}>
									<Text mr={'.5em'} fontSize={'2xl'}>
										Социальные сети:
									</Text>
									<List>
										{user.socialLinks.map(link => (
											<ListItem fontSize={'2xl'}>
												<Link
													href={`https://${link}`}
												>{`https://${link}`}</Link>
											</ListItem>
										))}
									</List>
								</Flex>
							) : (
								<Flex>
									<Text mt={'.5em'} fontSize={'2xl'}>
										Соц. сети отсутствуют
									</Text>
								</Flex>
							)}
							<Text mt={'.5em'} fontSize={'2xl'}>
								Кол-во треков: {tracks?.length}
							</Text>
						</Flex>
						{/* <Button onClick={() => setEditing(!editing)}>
							{editing ? 'Сохранить' : 'Редактировать'}
						</Button> */}
					</Flex>
				</Box>
			)}
		</>
	)
}

export default ProfileScreen
