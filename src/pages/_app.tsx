import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import '../styles/global.scss'
import { ChakraProvider } from '@chakra-ui/provider'

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default App
