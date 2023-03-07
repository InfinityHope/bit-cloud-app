import { API_URL } from "@/app/constants/api.constants"
import { useSidebar } from "@/app/hooks/useSidebar"
import { animationsConfig } from "@/config/animations.config"
import { useAuth } from "@/hooks/auth-hooks"
import { AuthService } from "@/services/auth-services/auth.service"
import { Avatar, Button, List, ListIcon, ListItem, Stack, StackDivider } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiLogOut } from "react-icons/bi"
import { GiMicrophone } from "react-icons/gi"
import { IoIosCreate, IoMdBackspace } from "react-icons/io"
import { RiHomeLine, RiMusic2Line } from "react-icons/ri"
import styles from "./Sidebar.module.scss"

const MotionStack = motion(Stack)

const Sidebar = () => {
	const { setUser, setAuthType, user } = useAuth()
	const { isActive, toggleMenu } = useSidebar()
	const { pathname } = useRouter()

	const logout = () => {
		setUser(null)
		setAuthType("login")
		AuthService.logout()
	}

	return (
		<>
			{isActive && (
				<Button
					onClick={toggleMenu}
					zIndex={100}
					variant={"link"}
					position={"absolute"}
					top={30}
					right={30}
				>
					<IoMdBackspace size={30} />
				</Button>
			)}
			<MotionStack
				divider={<StackDivider borderColor='secondaryTextColor' />}
				spacing={isActive ? 10 : 20}
				align={"normal"}
				className={styles.Sidebar}
				initial={"initialFromLeft"}
				animate={"animateFromLeft"}
				transition={{
					opacity: { ease: "linear" },
					duration: 0.7
				}}
				variants={animationsConfig}
			>
				{isActive && (
					<List fontSize={"1.5em"} color={"primaryTextColor"}>
						{user ? (
							<Link href={"/profile"}>
								<Avatar src={`${API_URL}/${user?.avatar}`} />
							</Link>
						) : (
							<Link href={"/auth"}>
								<Button>Войти</Button>
							</Link>
						)}
					</List>
				)}
				<List spacing={10} color={"primaryTextColor"}>
					<ListItem className={pathname === "/" ? styles.LinkActive : ""}>
						<Link href={"/"}>
							<ListIcon as={RiHomeLine} />
							Главная
						</Link>
					</ListItem>
					<ListItem className={pathname.includes("/tracks") ? styles.LinkActive : ""}>
						<Link href={"/tracks"}>
							<ListIcon as={RiMusic2Line} />
							Все треки
						</Link>
					</ListItem>
					<ListItem className={pathname.includes("/musicians") ? styles.LinkActive : ""}>
						<Link href={"/musicians"}>
							<ListIcon as={GiMicrophone} />
							Все музыканты
						</Link>
					</ListItem>
				</List>
				{user?.role === "MUSICIAN" && (
					<List fontSize={"1.5em"} spacing={10} color={"primaryTextColor"}>
						<ListItem className={pathname === "/my-tracks" ? styles.LinkActive : ""}>
							<Link href={"/my-tracks"}>
								<ListIcon as={RiMusic2Line} />
								Мои треки
							</Link>
						</ListItem>
						<ListItem className={pathname === "/create-track" ? styles.LinkActive : ""}>
							<Link href={"/create-track"}>
								<ListIcon as={IoIosCreate} />
								Добавить трек
							</Link>
						</ListItem>
					</List>
				)}

				{user && (
					<List fontSize={"1.5em"} spacing={10} color={"primaryTextColor"}>
						<ListItem cursor={"pointer"} onClick={logout}>
							<ListIcon as={BiLogOut} />
							Выйти
						</ListItem>
					</List>
				)}
			</MotionStack>
		</>
	)
}

export default Sidebar
