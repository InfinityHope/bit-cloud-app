import { extendTheme } from '@chakra-ui/react'

const config = {
	colors: {
		primary: '#101012',
		secondary: '#11111f',
		darkBlue: '#141839',
		lightBlue: '#3542c6'
	},
	layerStyles: {
		layout: {
			bgGradient:
				'linear(160deg, primary 25%, secondary 55%, darkBlue 95%)',
			height: '100vh'
		}
	}
}

export const theme = extendTheme(config)
