import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/chakra.config'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthProvider from '@/app/providers/auth-provider/AuthProvider'
import { HistoryProvider } from '@/app/providers/history-provider/HistoryProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<HistoryProvider>
					<ChakraProvider theme={theme}>
						<Component {...pageProps} />
					</ChakraProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</HistoryProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
export default MyApp
