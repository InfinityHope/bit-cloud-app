import React from 'react'
import CustomSpinner from '@/ui/custom-spinner/CustomSpinner'
import MusiciansList from '@/ui/musicians-list/MusiciansList'
import { Heading } from '@chakra-ui/react'
import Meta from '@/components/meta/Meta'
import { useMusicians } from '@/hooks/user-hooks/useMusicians'

const MusiciansPage = () => {
	const { musicians, isLoading } = useMusicians()

	return (
		<>
			<Meta title={'Sound Cloud Authors'} />
			{isLoading ? <CustomSpinner /> : null}
			{musicians && (
				<>
					<Heading color={'white'} as={'h3'} mb={'1em'}>
						Все музыканты
					</Heading>
					<MusiciansList musicians={musicians} />
				</>
			)}
		</>
	)
}

export default MusiciansPage
