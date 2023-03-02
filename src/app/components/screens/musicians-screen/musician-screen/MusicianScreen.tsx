import Meta from '@/components/meta/Meta'
import { AuthorInfoSkeleton } from '@/components/ui'
import { useAuthorTracks } from '@/hooks/tracks-hooks/useAuthorTracks'
import { useMusician } from '@/hooks/user-hooks/useMusician'
import { useRouter } from 'next/router'
import MusicianProfile from './musician-profile/MusicianProfile'

const MusicianScreen = () => {
	const { query } = useRouter()
	const nickName = query?.nickName
	const { musician, isLoading } = useMusician(nickName)
	const { tracks, isTracksLoading } = useAuthorTracks(musician && musician.id)

	return (
		<>
			<Meta title={`Bit Cloud Author: ${nickName}`} />
			{isLoading || isTracksLoading ? <AuthorInfoSkeleton /> : null}
			{musician && tracks && <MusicianProfile musician={musician} tracks={tracks} />}
		</>
	)
}

export default MusicianScreen
