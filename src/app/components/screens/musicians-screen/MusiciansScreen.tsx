import Meta from '@/components/meta/Meta'
import { CustomSpinner, MusiciansList } from '@/components/ui'
import { useMusicians } from '@/hooks/user-hooks/useMusicians'
import { Heading } from '@chakra-ui/react'

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
