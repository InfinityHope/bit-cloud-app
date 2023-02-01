import React from 'react'
import Layout from '@/ui/layout/Layout'
import { useQuery } from 'react-query'
import { UserService } from '@/services/user-service/user.service'
import CustomSpinner from '@/ui/custom-spinner/CustomSpinner'
import MusiciansList from '@/ui/musicians-list/MusiciansList'
import { Heading } from '@chakra-ui/react'

const MusiciansPage = () => {
	const { data, isLoading } = useQuery('musicians-page', () => UserService.getAllMusicians(), {
		select: ({ data }) => data
	})

	return (
		<Layout title={'Sound Cloud Authors'}>
			{isLoading ? <CustomSpinner /> : null}
			{data && (
				<>
					<Heading color={'white'} as={'h3'} mb={'1em'}>
						Все музыканты
					</Heading>
					<MusiciansList users={data} />
				</>
			)}
		</Layout>
	)
}

export default MusiciansPage
