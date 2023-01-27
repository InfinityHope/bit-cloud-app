import React, { useEffect } from 'react'
import LoginForm from '@/ui/auth-form/login-form/LoginForm'
import RegisterForm from '@/ui/auth-form/register-form/RegisterForm'
import Layout from '@/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'

const AuthPage: NextPage = () => {
	const { user, authType } = useAuth()
	const { push } = useRouter()

	useEffect(() => {
		if (user) {
			push('/').then(r => r)
		}
	}, [user])

	return (
		<Layout title={'Sound Cloud Authentication'}>
			<Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				{authType === 'login' ? <LoginForm /> : <RegisterForm />}
			</Flex>
		</Layout>
	)
}

export default AuthPage
