import { useContext } from "react"
import { SidebarContext } from "./../providers/sidebar-provider/SidebarProvider"

export const useSidebar = () => useContext(SidebarContext)
