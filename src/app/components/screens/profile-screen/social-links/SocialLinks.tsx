import { CustomPopover } from '@/app/components/ui'
import { useNotification } from '@/app/hooks/useNotification'
import { checkSocialLink } from '@/app/utils/checkSocialLink'
import { Button, Flex, Link, List, ListItem, Text } from '@chakra-ui/react'
import { Dispatch, FC, SetStateAction, useRef } from 'react'
import styles from './SocialLinks.module.scss'

interface ISocialLinks {
	editing: boolean
	setSocialLinks: Dispatch<SetStateAction<string[]>>
	socialLinks: string[]
}

const SocialLinks: FC<ISocialLinks> = ({ editing, socialLinks, setSocialLinks }) => {
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
		<Flex className={styles.SocialLinks}>
			{socialLinks.length !== 0 ? (
				<>
					<Text mr={'.5em'}>Социальные сети:</Text>
					<List>
						{socialLinks.map((link, index) => (
							<ListItem key={link}>
								<Link target={'_blank'} href={`https://${link}`}>
									{checkSocialLink(`${link}`)}
								</Link>
								{editing && (
									<Button
										size={'xs'}
										ml={'1em'}
										onClick={() => removeSocialLink(index)}
									>
										x
									</Button>
								)}
							</ListItem>
						))}
					</List>
				</>
			) : (
				<Flex>
					<Text fontSize={'2xl'}>Соц. сети отсутствуют</Text>
				</Flex>
			)}
			{editing && (
				<CustomPopover
					addFunc={addSocialLink}
					formLabel={'Введите ссылку'}
					ref={socialLinkRef}
				/>
			)}
		</Flex>
	)
}

export default SocialLinks
