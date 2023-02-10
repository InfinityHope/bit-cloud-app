import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/chakra.config'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from '@/app/providers/auth-provider/AuthProvider'
import { HistoryProvider } from '@/app/providers/history-provider/HistoryProvider'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import Layout from '@/ui/layout/Layout'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

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
						{/*<ReactQueryDevtools initialIsOpen={false} />*/}
					</HistoryProvider>
				</AuthProvider>
			</QueryClientProvider>
		</Provider>
	)
}
export default MyApp
