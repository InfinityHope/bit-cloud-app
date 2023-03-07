import { defineStyleConfig } from '@chakra-ui/react'

const buttonTheme = defineStyleConfig({
	baseStyle: {
		fontWeight: 'regular',
		bg: 'lightBlue'
	},
	variants: {
		solid: {
			bg: 'lightBlue',
			_hover: { bg: 'darkBlue' },
			color: 'white',
			_active: { bg: 'darkBlue' }
		},
		outline: {
			bg: 'transparent',
			_hover: { bg: 'darkBlue' },
			color: 'white',
			_active: { bg: 'darkBlue' }
		},
		link: {
			bg: 'transparent',
			color: 'white'
		}
	},
	defaultProps: {
		size: 'md',
		variant: 'solid'
	}
})

export default buttonTheme
