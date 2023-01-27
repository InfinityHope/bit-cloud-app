import React from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchInput = () => {
	return (
		<InputGroup width={'60%'} alignItems={'center'}>
			<InputRightElement pointerEvents='none' children={<SearchIcon color='white' />} />
			<Input variant={'unstyled'} placeholder={'Поиск по трекам'} />
		</InputGroup>
	)
}

export default SearchInput
