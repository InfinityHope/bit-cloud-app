import { extendTheme } from "@chakra-ui/react"
import buttonTheme from "./button.config"
import { menuTheme } from "./menu.config"

const config = {
	components: {
		Menu: menuTheme,
		Button: buttonTheme
	},
	fontSizes: {
		xl: "4em"
	},
	breakpoints: {
		sm: "320px",
		md: "768px",
		lg: "960px",
		xl: "1199px",
		base: "1200px"
	},

	colors: {
		primary: "#101012",
		secondary: "#11111f",
		darkBlue: "#141839",
		lightBlue: "#3542c6",
		primaryTextColor: "#e7e7e7",
		secondaryTextColor: "#2b2b2d"
	},
	styles: {
		global: {
			body: {
				bgGradient: "linear(160deg, primary 25%, secondary 55%, darkBlue 95%)",
				height: "100vh",
				overflowY: "hidden"
			},
			a: {
				color: "inherit",
				textDecoration: "none",
				padding: 0,
				margin: 0
			},
			"input:focus-visible, textarea:focus-visible": {
				boxShadow: "none !important"
			}
		}
	}
}

export const theme = extendTheme(config)
