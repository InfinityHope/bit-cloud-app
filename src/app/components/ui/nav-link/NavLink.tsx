import React, { FC, PropsWithChildren } from 'react'
import { INavLink } from '@/ui/nav-link/nav-link.interface'
import Link from 'next/link'

const NavLink: FC<PropsWithChildren<INavLink>> = ({ children, className, link }) => {
	return (
		<Link href={link} passHref legacyBehavior>
			<a className={className}>{children}</a>
		</Link>
	)
}

export default NavLink
