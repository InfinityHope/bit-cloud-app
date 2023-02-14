import { API_URL } from '@/app/constants/api.constants'
import { SearchInput } from '@/components/ui'
import { animationsConfig } from '@/config/animations.config'
import { useAuth } from '@/hooks/auth-hooks'
import { useHistory } from '@/hooks/useHistory'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Avatar, Button, Flex, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
	const { back } = useHistory()
	const { user } = useAuth()

	return (
		<motion.div
			initial={'initialFromTop'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.5
			}}
			viewport={{ once: true }}
			variants={animationsConfig}
			animate={'animateFromTop'}
		>
			<Flex color={'primaryTextColor'} alignItems={'center'} justifyContent={'space-between'}>
				<Heading as='h1' size='xl' noOfLines={1}>
					Sound Cloud
				</Heading>

				<Flex justifyContent={'space-between'} alignItems={'center'} width={'80%'}>
					<Button variant={'outline'} colorScheme={''} onClick={back}>
						<ArrowBackIcon />
					</Button>
					<Flex justifyContent={'space-between'} alignItems={'center'} width={'40%'}>
						<SearchInput />
						{user ? (
							<Link href={'/profile'}>
								<Avatar src={`${API_URL}/${user?.avatar}`} />
							</Link>
						) : (
							<Link href={'/auth'}>
								<Button colorScheme={'facebook'}>Войти</Button>
							</Link>
						)}
					</Flex>
				</Flex>
			</Flex>
		</motion.div>
	)
}

export default Header
