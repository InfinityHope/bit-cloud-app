import { useSidebar } from '@/app/hooks/useSidebar'
import { AudioPlayer, Header, Sidebar } from '@/components/ui'
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'
import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { pathname } = useRouter()
	const { isActive, toggleMenu } = useSidebar()
	const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)', {
		ssr: true,
		fallback: false
	})

	useEffect(() => {
		if (isLargerThan1200) {
			toggleMenu
		}
	}, [isLargerThan1200])

	return (
		<>
			{pathname !== '/auth' ? (
				<Grid
					templateAreas={{
						base: `
							"header header"
							"nav main"
							"player player"
            `,
						xl: `
							"header header"
							"main main"
							"player player"
            `,
						lg: `
							"header header"
							"main main"
							"player player"
						`,
						md: `
							"header header"
							"main main"
							"player player"
						`,
						sm: `
							"header header"
							"main main"
							"player player"
						`
					}}
					gridTemplateColumns={'20% 1fr'}
					columnGap={'1em'}
				>
					<GridItem
						as={'header'}
						area={'header'}
						height={'10vh'}
						bgColor={'primary'}
						p={'2em 2em 6em 3em'}
					>
						<Header />
					</GridItem>

					{isLargerThan1200 ? (
						<GridItem as={'nav'} area={'nav'} p={'4em 2em 0 3em'} width={'full'}>
							<Sidebar />
						</GridItem>
					) : (
						<GridItem
							zIndex={3}
							position={'absolute'}
							height={'100vh'}
							bg={'primary'}
							width={'320px'}
							display={isActive ? 'block' : 'none'}
							top={0}
							left={0}
							as={'nav'}
							area={'nav'}
							p={'4em 2em 0 3em'}
						>
							<Sidebar />
						</GridItem>
					)}

					<GridItem
						as={'main'}
						zIndex={'1'}
						area={'main'}
						bg={'primary'}
						height={'90vh'}
						p={'.5em 0em 8em 0em'}
						overflowY={'auto'}
						className={styles.Main}
					>
						{children}
					</GridItem>

					<GridItem zIndex={2} area={'player'} height={'10vh'}>
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
