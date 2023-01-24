import React, { FC, PropsWithChildren } from 'react'
import Meta from '@/components/meta/Meta'
import { Flex } from '@chakra-ui/react'
import { ILayout } from '@/ui/layout/layout.interface'

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	content,
	meta
}) => {
	return (
		<>
			<Meta {...meta} />
			<main>
				<Flex layerStyle={'layout'} {...content}>
					{children}
				</Flex>
			</main>
		</>
	)
}

export default Layout
