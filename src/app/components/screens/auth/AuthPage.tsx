import React, { useEffect } from 'react'
import LoginForm from '@/ui/auth-form/login-form/LoginForm'
import RegisterForm from '@/ui/auth-form/register-form/RegisterForm'
import Layout from '@/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const AuthPage = () => {
	const { user, authType } = useAuth()
	const { push } = useRouter()

	useEffect(() => {
		if (user) {
			push('/').then(r => r)
		}
	}, [user])

	return (
		<Layout
			meta={{
				title: 'Sound Cloud Authentication'
			}}
			content={{
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{authType === 'login' ? <LoginForm /> : <RegisterForm />}
		</Layout>
	)
}

export default AuthPage
