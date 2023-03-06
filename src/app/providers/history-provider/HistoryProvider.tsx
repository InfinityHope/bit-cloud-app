import { IHistoryContext } from '@/app/providers/history-provider/history.interface'
import { useRouter } from 'next/router'
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'

export const HistoryContext = createContext<IHistoryContext>({} as IHistoryContext)

export const HistoryProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { asPath, push, pathname } = useRouter()
	const [history, setHistory] = useState<string[]>([])

	function back() {
		for (let i = history.length - 2; i >= 0; i--) {
			const route = history[i]
			if (!route.includes('#') && route !== pathname) {
				if (route.includes('auth')) {
					continue
				}
				push(route)

				const newHistory = history.slice(0, i)
				setHistory(newHistory)

				break
			}
		}
	}

	useEffect(() => {
		setHistory(previous => [...previous, asPath])
	}, [asPath])

	return (
		<HistoryContext.Provider
			value={{
				back,
				history,
				setHistory
			}}
		>
			{children}
		</HistoryContext.Provider>
	)
}
