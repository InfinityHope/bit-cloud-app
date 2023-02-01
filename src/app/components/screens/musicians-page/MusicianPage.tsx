import React from 'react'
import Layout from '@/ui/layout/Layout'
import { useRouter } from 'next/router'
import { UserService } from '@/services/user-service/user.service'
import { useQuery } from 'react-query'
import AuthorInfoSkeleton from '@/ui/skeletons/AuthorInfoSkeleton'
import MusicianProfile from '@/ui/musician-profile/MusicianProfile'

const MusicianPage = () => {
	const { query } = useRouter()
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
		<Layout title={`${query.nickName}`}>
			{isLoading ? <AuthorInfoSkeleton /> : null}
			{user && <MusicianProfile user={user} />}
		</Layout>
	)
}

export default MusicianPage
