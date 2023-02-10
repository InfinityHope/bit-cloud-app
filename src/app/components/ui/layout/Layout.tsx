import { FC, PropsWithChildren } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { AudioPlayer, Header, Sidebar } from '@/components/ui'
import styles from './Layout.module.scss'
import { useAuth } from '@/hooks/auth-hooks/useAuth'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	return (
		<>
			{user ? (
				<Grid
					templateAreas={`
					  "header header"
					  "nav main"
					  "player player"
                	`}
					gridTemplateColumns={'20% 1fr'}
					columnGap={'1em'}
				>
					<GridItem
						as={'header'}
						area={'header'}
						height={'10vh'}
						bgColor={'primary'}
						p={'2em 2em 0 3em'}
					>
						{user ? <Header /> : ''}
					</GridItem>

					<GridItem as={'nav'} area={'nav'} p={'4em 2em 0 3em'}>
						<Sidebar />
					</GridItem>

					<GridItem
						as={'main'}
						area={'main'}
						bgColor={'primary'}
						height={'90vh'}
						p={'.5em 2em 6em 2em'}
						overflowY={'auto'}
						className={styles.Main}
					>
						{children}
					</GridItem>

					<GridItem area={'player'} height={'10vh'}>
						{user ? <AudioPlayer /> : ''}
					</GridItem>
				</Grid>
			) : (
				<main>{children}</main>
			)}
		</>
	)
}

export default Layout
