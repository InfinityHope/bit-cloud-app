import React, { useEffect } from 'react'
import LoginForm from '@/ui/auth-form/login-form/LoginForm'
import RegisterForm from '@/ui/auth-form/register-form/RegisterForm'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import Meta from '@/components/meta/Meta'

const AuthPage = () => {
	const { user, authType } = useAuth()
	const { push } = useRouter()

	useEffect(() => {
		if (user) {
			push('/').then(r => r)
		}
	}, [user])

	return (
		<>
			<Meta title={'Sound Cloud Auth'} />
			<Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				{authType === 'login' ? <LoginForm /> : <RegisterForm />}
			</Flex>
		</>
	)
}

export default AuthPage
