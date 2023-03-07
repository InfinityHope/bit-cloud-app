import { API_URL } from '@/app/constants/api.constants'
import { useSidebar } from '@/app/hooks/useSidebar'
import { SearchInput } from '@/components/ui'
import { animationsConfig } from '@/config/animations.config'
import { useAuth } from '@/hooks/auth-hooks'
import { useHistory } from '@/hooks/useHistory'
import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Button, Flex, Heading, useMediaQuery } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const MotionFlex = motion(Flex)

const Header = () => {
	const { back } = useHistory()
	const { user } = useAuth()
	const { toggleMenu } = useSidebar()
	const [isLargerThan935] = useMediaQuery('(min-width: 935px)', {
		ssr: true,
		fallback: false
	})
	const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)', {
		ssr: true,
		fallback: false
	})

	return (
		<MotionFlex
			flexDirection={isLargerThan935 ? 'row' : 'column'}
			color={'primaryTextColor'}
			alignItems={'center'}
			justifyContent={'space-between'}
			initial={'initialFromTop'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.5
			}}
			viewport={{ once: true }}
			variants={animationsConfig}
			animate={'animateFromTop'}
			width={'full'}
		>
			<Heading as='h1' size='xl' noOfLines={1}>
				Bit Cloud
			</Heading>

			<Flex
				justifyContent={'space-between'}
				alignItems={'center'}
				width={isLargerThan935 ? '80%' : '100%'}
			>
				{!isLargerThan1200 ? (
					<Button variant={'outline'} onClick={toggleMenu}>
						<HamburgerIcon />
					</Button>
				) : (
					<Button variant={'outline'} onClick={back}>
						<ArrowBackIcon />
					</Button>
				)}

				<Flex
					justifyContent={isLargerThan935 ? 'space-between' : 'center'}
					alignItems={'center'}
					width={isLargerThan935 ? '40%' : '100%'}
				>
					<SearchInput width={isLargerThan935 ? '60%' : '80%'} />
					{isLargerThan1200 ? (
						user ? (
							<Link href={'/profile'}>
								<Avatar src={`${API_URL}/${user?.avatar}`} />
							</Link>
						) : (
							<Link href={'/auth'}>
								<Button>Войти</Button>
							</Link>
						)
					) : null}
				</Flex>
			</Flex>
		</MotionFlex>
	)
}

export default Header
