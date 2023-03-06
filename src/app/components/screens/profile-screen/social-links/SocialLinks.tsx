import { useNotification } from '@/app/hooks/useNotification'
import { checkSocialLink } from '@/app/utils/checkSocialLink'
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
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
import { FC, useRef } from 'react'
import { BiPlus } from 'react-icons/bi'

interface ISocialLinks {
	editing: boolean
	setSocialLinks: any
	socialLinks: string[]
}

const SocialLinks: FC<ISocialLinks> = ({ editing, socialLinks, setSocialLinks }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const { errorMessage } = useNotification()
	const socialLinkRef = useRef<HTMLInputElement | null>(null)

	const removeSocialLink = (removedLinkIndex: number) => {
		setSocialLinks(socialLinks.filter((_, index) => index !== removedLinkIndex))
	}

	const addSocialLink = () => {
		if (socialLinkRef.current && socialLinkRef.current.value !== '') {
			if (
				socialLinkRef.current.value.includes('t.me') ||
				socialLinkRef.current.value.includes('vk.com') ||
				socialLinkRef.current.value.includes('wa.me') ||
				socialLinkRef.current.value.includes('facebook.com')
			) {
				setSocialLinks([...socialLinks, socialLinkRef.current.value])
				socialLinkRef.current.value = ''
			} else {
				errorMessage('Ошибка', 'Можно добавить только: Facebook, WhatsApp, Vk, Telegram')
			}
		} else {
			errorMessage('Введите значение', 'Ссылка не может быть пустой')
		}
	}

	return (
		<>
			{socialLinks.length !== 0 ? (
				<Flex mt={'1em'} alignItems={'center'}>
					<Text mr={'.5em'} fontSize={'2xl'}>
						Социальные сети:
					</Text>
					<List display={'flex'}>
						{socialLinks.map((link, index) => (
							<ListItem
								lineHeight={'1em'}
								key={link}
								fontSize={'2xl'}
								mr={'.5em'}
								alignItems={'flex-end'}
								display={'flex'}
							>
								<Link href={`https://${link}`}>{checkSocialLink(`${link}`)}</Link>
								{editing && (
									<Button
										size={'xs'}
										_hover={{ bgColor: 'darkBlue' }}
										bgColor={'lightBlue'}
										ml={'1em'}
										onClick={() => removeSocialLink(index)}
									>
										x
									</Button>
								)}
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
										<FormLabel>Введите ссылку</FormLabel>
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
		</>
	)
}

export default SocialLinks
