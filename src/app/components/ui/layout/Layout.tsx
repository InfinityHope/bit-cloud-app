import { AudioPlayer, Header, Sidebar } from '@/components/ui'
import { Grid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { pathname } = useRouter()

	return (
		<>
			{pathname !== '/auth' ? (
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
						<Header />
					</GridItem>

					<GridItem as={'nav'} area={'nav'} p={'4em 2em 0 3em'}>
						<Sidebar />
					</GridItem>

					<GridItem
						as={'main'}
						area={'main'}
						bgColor={'primary'}
						height={'90vh'}
						p={'.5em 0em 8em 0em'}
						overflowY={'auto'}
						className={styles.Main}
					>
						{children}
					</GridItem>

					<GridItem area={'player'} height={'10vh'}>
						<AudioPlayer />
					</GridItem>
				</Grid>
			) : (
				<main>{children}</main>
			)}
		</>
	)
}

export default Layout
