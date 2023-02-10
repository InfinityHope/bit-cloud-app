import { CustomSpinner, MusiciansList } from '@/components/ui'
import { Heading } from '@chakra-ui/react'
import Meta from '@/components/meta/Meta'
import { useMusicians } from '@/hooks/user-hooks/useMusicians'

const MusiciansScreen = () => {
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

export default MusiciansScreen
