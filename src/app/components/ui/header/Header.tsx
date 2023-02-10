import { FC } from 'react'
import { Avatar, Button, Flex, Heading } from '@chakra-ui/react'
import { SearchInput } from '@/components/ui'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from '@/hooks/useHistory'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'

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
						<Link href={'/profile'}>
							<Avatar src={`${process.env.API_URL}/${user?.avatar}`} />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</motion.div>
	)
}

export default Header
