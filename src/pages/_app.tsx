import { AuthProvider } from '@/app/providers/auth-provider/AuthProvider'
import { HistoryProvider } from '@/app/providers/history-provider/HistoryProvider'
import { Layout } from '@/components/ui'
import { theme } from '@/config/chakra.config'
import { queryClient } from '@/config/react-query.config'
import { store } from '@/store/store'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
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
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	)
}

export default MyApp
