import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
	button: {
		fontWeight: 'medium',
		bg: '#3542c6',
		color: 'white',
		p: '2',
		borderRadius: 'lg'
	},
	list: {
		p: '2',
		borderRadius: 'xl',
		border: 'none',
		bg: '#11112f'
	},
	item: {
		bg: 'transparent',
		mt: '1',
		color: 'white',
		_hover: {
			bg: '#3542c6'
		}
	},
	divider: {
		my: '1',
		borderColor: 'white',
		borderBottom: '2px solid'
	}
})
export const menuTheme = defineMultiStyleConfig({ baseStyle })
