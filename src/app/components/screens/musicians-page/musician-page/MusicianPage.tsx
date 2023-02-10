import React from 'react'
import AuthorInfoSkeleton from '@/ui/skeletons/AuthorInfoSkeleton'
import MusicianProfile from '@/ui/musician-profile/MusicianProfile'
import { useQuery } from 'react-query'
import { UserService } from '@/services/user-service/user.service'
import { useRouter } from 'next/router'
import Meta from '@/components/meta/Meta'
import { useActions } from '@/hooks/useActions'

const MusicianPage = () => {
	const { query } = useRouter()
	const { setTracks } = useActions()
	const nickName = query?.nickName

	const { data: user, isLoading } = useQuery(
		['musician info', nickName],
		() => UserService.getMusician(String(nickName)),
		{
			select: ({ data }) => data,
			enabled: !!nickName
		}
	)

	return (
		<>
			<Meta title={`Sound Cloud ${nickName}`} />
			{isLoading ? <AuthorInfoSkeleton /> : null}
			{user && <MusicianProfile user={user} />}
		</>
	)
}

export default MusicianPage
