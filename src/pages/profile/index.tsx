import { useAuth } from '@/app/hooks/auth-hooks/useAuth'
import { GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

const Profile: NextPage = () => {
	return <div>Profile</div>
}

export const getStaticProps: GetStaticProps = async ctx => {
	const queryClient = new QueryClient()
	const { user } = useAuth()

	if (!user) {
		return {
			redirect: {
				permanent: false,
				destination: '/'
			}
		}
	}

	await queryClient.fetchQuery(['profile', user?.nickName])

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default Profile
