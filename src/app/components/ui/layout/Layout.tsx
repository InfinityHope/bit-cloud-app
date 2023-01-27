import React, { FC, PropsWithChildren } from 'react'
import Meta from '@/components/meta/Meta'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/ui/header/Header'
import { IMeta } from '@/components/meta/meta.interface'
import { Grid, GridItem } from '@chakra-ui/react'
import Sidebar from '@/ui/sidebar/Sidebar'

const Layout: FC<PropsWithChildren<IMeta>> = ({ children, ...meta }) => {
	const { user } = useAuth()
	return (
		<>
			<Meta {...meta} />
			{user ? (
				<Grid
					templateAreas={`
				  "header header"
                  "nav main"
                `}
					gridTemplateColumns={'15% 1fr'}
					rowGap={'4em'}
					columnGap={'1em'}
					padding={'2em 4em'}
				>
					<GridItem pl='2' area={'header'}>
						{user ? <Header /> : ''}
					</GridItem>

					<GridItem area={'nav'}>
						<Sidebar />
					</GridItem>
					<GridItem area={'main'}>
						<main>{children}</main>
					</GridItem>
				</Grid>
			) : (
				<main>{children}</main>
			)}
		</>
	)
}

export default Layout