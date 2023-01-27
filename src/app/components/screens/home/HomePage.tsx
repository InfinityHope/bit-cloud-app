import React from 'react'
import Layout from '@/ui/layout/Layout'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<Layout title={'Sound Cloud Home'}>
			<audio></audio>
		</Layout>
	)
}

export default HomePage
