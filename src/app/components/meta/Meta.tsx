import React, { FC } from 'react'
import Head from 'next/head'
import { IMeta } from '@/components/meta/meta.interface'

const Meta: FC<IMeta> = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name={'description'} content={description} />
		</Head>
	)
}

export default Meta
