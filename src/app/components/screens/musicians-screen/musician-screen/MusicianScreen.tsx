import { AuthorInfoSkeleton, MusicianProfile } from '@/components/ui'
import Meta from '@/components/meta/Meta'
import { useRouter } from 'next/router'
import { useMusician } from '@/hooks/user-hooks/useMusician'

const MusicianScreen = () => {
	const { query } = useRouter()
	const nickName = query?.nickName
	const { musician, isLoading } = useMusician(nickName)

	return (
		<>
			<Meta title={`Sound Cloud ${nickName}`} />
			{isLoading ? <AuthorInfoSkeleton /> : null}
			{musician && <MusicianProfile musician={musician} />}
		</>
	)
}

export default MusicianScreen
