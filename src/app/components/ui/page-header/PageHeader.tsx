import { animationsConfig } from "@/config/animations.config"
import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC, PropsWithChildren } from "react"
import styles from "./PageHeader.module.scss"

const MotionBox = motion(Box)

const PageHeader: FC<PropsWithChildren<{ bgImg: string }>> = ({ children, bgImg }) => {
	return (
		<MotionBox
			initial={"initialFromLeft"}
			animate={"animateFromLeft"}
			transition={{
				opacity: { ease: "linear" },
				duration: 0.7
			}}
			variants={animationsConfig}
			backgroundImage={bgImg}
			className={styles.PageHeader}
		>
			{children}
		</MotionBox>
	)
}

export default PageHeader
