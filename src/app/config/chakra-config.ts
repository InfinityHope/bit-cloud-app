import { extendTheme } from '@chakra-ui/react'

const config = {
	colors: {
		primary: '#101012',
		secondary: '#11111f',
		darkBlue: '#141839',
		lightBlue: '#3542c6',
		primaryTextColor: '#e7e7e7',
		secondaryTextColor: '#2b2b2d'
	},
	styles: {
		global: {
			body: {
				bgGradient: 'linear(160deg, primary 25%, secondary 55%, darkBlue 95%)',
				height: '100vh'
			},
			a: {
				color: 'inherit',
				textDecoration: 'none',
				padding: 0,
				margin: 0
			}
		}
	}
}

export const theme = extendTheme(config)
