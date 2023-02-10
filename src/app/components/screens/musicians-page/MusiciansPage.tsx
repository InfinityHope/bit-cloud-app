import React from 'react'
import CustomSpinner from '@/ui/custom-spinner/CustomSpinner'
import MusiciansList from '@/ui/musicians-list/MusiciansList'
import { Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { UserService } from '@/services/user-service/user.service'
import Meta from '@/components/meta/Meta'

const MusiciansPage = () => {
	const { data, isLoading } = useQuery('musicians list', () => UserService.getAllMusicians(), {
		select: ({ data }) => data
	})

	return (
		<>
			<Meta title={'Sound Cloud Authors'} />
			{isLoading ? <CustomSpinner /> : null}
			{data && (
				<>
					<Heading color={'white'} as={'h3'} mb={'1em'}>
						Все музыканты
					</Heading>
					<MusiciansList users={data} />
				</>
			)}
		</>
	)
}

export default MusiciansPage
