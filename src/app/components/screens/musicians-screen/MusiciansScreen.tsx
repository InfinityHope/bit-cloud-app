import Meta from '@/components/meta/Meta'
import { CustomSpinner } from '@/components/ui'
import { useMusicians } from '@/hooks/user-hooks/useMusicians'
import { Heading } from '@chakra-ui/react'
import MusiciansList from './musicians-list/MusiciansList'

const MusiciansScreen = () => {
	const { musicians, isLoading } = useMusicians()

	return (
		<>
			<Meta title={'Bit Cloud Authors'} />
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

export default MusiciansScreen
