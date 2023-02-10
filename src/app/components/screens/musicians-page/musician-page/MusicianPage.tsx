import React from 'react'
import AuthorInfoSkeleton from '@/ui/skeletons/AuthorInfoSkeleton'
import MusicianProfile from '@/ui/musician-profile/MusicianProfile'
import { useRouter } from 'next/router'
import Meta from '@/components/meta/Meta'
import { useMusician } from '@/hooks/user-hooks/useMusician'

const MusicianPage = () => {
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

export default MusicianPage
