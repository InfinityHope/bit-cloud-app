import React, { FC } from 'react'
import { List, ListIcon, ListItem, Stack, StackDivider } from '@chakra-ui/react'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { RiHomeLine, RiMusic2Line } from 'react-icons/ri'
import { GiMicrophone } from 'react-icons/gi'
import { AuthService } from '@/services/auth-services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import NavLink from '@/ui/nav-link/NavLink'
import styles from './Sidebar.module.scss'
import { motion } from 'framer-motion'
import { animationsConfig } from '@/config/animations.config'

const MotionStack = motion(Stack)

const Sidebar: FC = () => {
	const { setUser, setAuthType, user } = useAuth()
	const { push, pathname } = useRouter()

	const logoutFromSystem = () => {
		setUser(null)
		setAuthType('login')
		AuthService.logout()
		push('auth')
	}

	return (
		<MotionStack
			divider={<StackDivider borderColor='secondaryTextColor' />}
			spacing={20}
			align={'normal'}
			as={'nav'}
			className={styles.Sidebar}
			initial={'initialFromLeft'}
			animate={'animateFromLeft'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.7
			}}
			variants={animationsConfig}
		>
			<List spacing={10} color={'primaryTextColor'}>
				<ListItem className={pathname === '/' ? styles.LinkActive : ''}>
					<NavLink link={'/'}>
						<ListIcon as={RiHomeLine} />
						Главная
					</NavLink>
				</ListItem>
				<ListItem className={pathname === '/tracks' ? styles.LinkActive : ''}>
					<Link href={'/tracks'}>
						<ListIcon as={RiMusic2Line} />
						Все треки
					</Link>
				</ListItem>
				<ListItem className={pathname === '/artists' ? styles.LinkActive : ''}>
					<Link href={'/artists'}>
						<ListIcon as={GiMicrophone} />
						Все исполнители
					</Link>
				</ListItem>
			</List>
			{user?.role === 'MUSICIAN' ? (
				<List fontSize={'1.5em'} spacing={10} color={'primaryTextColor'}>
					<ListItem className={pathname === '/tracks/author/id' ? styles.LinkActive : ''}>
						<Link href={'/tracks/author/id'}>
							<ListIcon as={RiMusic2Line} />
							Мои треки
						</Link>
					</ListItem>
				</List>
			) : null}

			<List fontSize={'1.5em'} spacing={10} color={'primaryTextColor'}>
				<ListItem cursor={'pointer'} onClick={logoutFromSystem}>
					<ListIcon as={BiLogOut} />
					Выйти
				</ListItem>
			</List>
		</MotionStack>
	)
}

export default Sidebar
