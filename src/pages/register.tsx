import Layout from '@/ui/layout/Layout'
import RegisterForm from '@/ui/AuthForm/registerForm/RegisterForm'

const Login = () => {
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
			<RegisterForm />
		</Layout>
	)
}

export default Login
