import Meta from '@/components/meta/Meta'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginForm from './auth-form/login-form/LoginForm'
import RegisterForm from './auth-form/register-form/RegisterForm'

const AuthScreen = () => {
	const { user, authType } = useAuth()
	const { push } = useRouter()

	useEffect(() => {
		if (user) {
			push('/')
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

export default AuthScreen
