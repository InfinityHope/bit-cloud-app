import Meta from '@/app/components/meta/Meta'
import { CustomSpinner } from '@/app/components/ui'
import { useTrack } from '@/app/hooks/tracks-hooks/useTrack'
import { useRouter } from 'next/router'

const TrackScreen = () => {
	const { query } = useRouter()
	const trackId = query?.id

	const { track, isLoading } = useTrack(Number(trackId))

	return (
		<>
			<Meta title={`Sound Cloud Track: ${track?.title}`} />
			{isLoading ? <CustomSpinner /> : null}
			{track && <div>{track.title}</div>}
		</>
	)
}

export default TrackScreen
