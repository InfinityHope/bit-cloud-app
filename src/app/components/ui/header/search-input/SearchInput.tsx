import { useSearchTerm } from '@/app/hooks/useSearchTerm'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

const SearchInput: FC<{ width: string }> = ({ width }) => {
	const { changeSearchTerm } = useSearchTerm()
	const { push } = useRouter()

	return (
		<InputGroup width={width} alignItems={'center'}>
			<InputRightElement
				boxSize={'30px'}
				children={
					<SearchIcon color='white' onClick={() => push('/search')} cursor={'pointer'} />
				}
			/>
			<Input
				variant={'unstyled'}
				placeholder={'Поиск по трекам'}
				onChange={changeSearchTerm}
			/>
		</InputGroup>
	)
}

export default SearchInput
