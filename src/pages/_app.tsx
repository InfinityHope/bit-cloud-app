import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from '@/app/config/chakra-config'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}
export default MyApp
