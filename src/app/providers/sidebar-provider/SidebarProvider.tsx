import { IContext } from "@/app/providers/sidebar-provider/sidebar.interface"
import { useRouter } from "next/router"
import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"

export const SidebarContext = createContext({} as IContext)

export const SidebarProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const { asPath } = useRouter()

	useEffect(() => {
		if (asPath) setIsActive(false)
	}, [asPath])

	const toggleMenu = () => {
		setIsActive(!isActive)
	}

	return (
		<SidebarContext.Provider value={{ isActive, toggleMenu }}>
			{children}
		</SidebarContext.Provider>
	)
}
