import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/app/providers/auth-provider/AuthProvider'
import { Provider } from 'react-redux'
import { HistoryProvider } from '@/app/providers/history-provider/HistoryProvider'
import { store } from '@/store/store'
import { theme } from '@/config/chakra.config'
import { Layout } from '@/components/ui'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '@/config/react-query.config'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<HistoryProvider>
						<ChakraProvider theme={theme}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ChakraProvider>
						<ReactQueryDevtools initialIsOpen={false} />
					</HistoryProvider>
				</AuthProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default MyApp
